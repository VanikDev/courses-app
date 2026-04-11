import { Router, Request, Response } from 'express'
import Course from '#/models/course.js'
import auth from '#/middleware/auth.js'
import { PopulatedCartItem, CartCourse } from '#/types/routes.js'

const router: Router = Router()

// функция вытаскивает необходимые данные, чтобы не тянуть все метаданные из CoreMongooseArray
function mapCartItems(cart: { items: PopulatedCartItem[] }): CartCourse[] {
  return cart.items.map((c) => ({
    ...c.courseId._doc,
    id: c.courseId.id,
    count: c.count,
  }))
}

function computePrice(courses: CartCourse[]): number {
  return courses.reduce((total, course) => {
    return (total += course.price * course.count)
  }, 0)
}

router.post('/add', auth, async (req: Request, res: Response): Promise<void>  => {
  const course = await Course.findById(req.body.id)
  await req.user.addToCart(course)
  res.redirect('/cart')
})

router.get('/', auth, async (req: Request, res: Response): Promise<void> => {
  const user = await req.user.populate('cart.items.courseId')
  const courses = mapCartItems(user.cart)
  // console.log(user.cart.items)

  res.render('cart', {
    title: 'Cart',
    isCart: true,
    courses,
    price: computePrice(courses),
  })
})

router.delete('/remove/:id', auth, async (req: Request, res: Response): Promise<void> => {
  await req.user.removeFromCart(req.params.id)
  const user = await req.user.populate<{ cart: { items: PopulatedCartItem[] } }>('cart.items.courseId')
  const courses = mapCartItems(user.cart)
  const cart = {
    courses,
    price: computePrice(courses),
  }

  res.status(200).json(cart)
})

export default router
