/** Course price formatting */
const toCurrency = (price) => {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency',
  }).format(price)
}

/** Date formatting */
const toDate = (date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(date))
}

document.querySelectorAll('.price').forEach((node) => {
  node.textContent = toCurrency(node.textContent)
})

document.querySelectorAll('.date').forEach((node) => {
  node.textContent = toDate(node.textContent)
})

/** Delete button handler, dynamic update cart */
const $cart = document.querySelector('#cart')
if ($cart) {
  $cart.addEventListener('click', (event) => {
    const { target } = event
    if (target.classList.contains('js-remove')) {
      const { id, csrf } = target.dataset
      console.log({ id })

      fetch(`/cart/remove/${id}`, {
        method: 'DELETE',
        headers: {
          'X-XSRF-TOKEN': csrf,
        },
      })
        .then((res) => res.json())
        .then((cart) => {
          if (cart.courses.length) {
            const html = cart.courses
              .map((c) => {
                return `
              <tr>
                <td>${c.title}</td>
                <td>${c.count}</td>
                <td>
                  <button class='btn btn-small js-remove' data-id='${c.id}'>Delete</button>
                </td>
              </tr>
              `
              })
              .join('')

            $cart.querySelector('tbody').innerHTML = html
            $cart.querySelector('.price').textContent = toCurrency(cart.price)
          } else {
            $cart.innerHTML = '<p>Cart is empty</p>'
          }
        })
    }
  })
}

/** Tabs Initialization */
M.Tabs.init(document.querySelectorAll('.tabs'))
