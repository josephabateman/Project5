/*to do

bootstrap

*/
const apiName = 'furniture'

// AJAX function
const callApi = async (ApiToCall) => {
    try {
        const response = await fetch(ApiToCall);
        if (response.ok) {
            const jsonResponse = await response.json();

            for (let i in jsonResponse) {

                //create elements
                const bootstrapClass = document.createElement('div')
                const thumbnail = document.createElement('div')
                const link = document.createElement('a')
                const productImage = document.createElement('img')
                const caption = document.createElement('div')
                const productName = document.createElement('h2')
                const productPrice = document.createElement('h3')
                const buyButton = document.createElement('button')

                //ids
                thumbnail.setAttribute('id', 'thumbnail')
                link.setAttribute('id', 'link-tag')
                productImage.setAttribute('id', 'img-tag')
                caption.setAttribute('id', 'caption-tag')
                productName.setAttribute('id', 'name-tag')
                productPrice.setAttribute('id', 'price-tag')
                buyButton.setAttribute('id', 'buy-button')

                //bootstrap classes
                bootstrapClass.setAttribute('class', 'col-md-4')
                thumbnail.setAttribute('class', 'btn btn-light thumbnail m-3 p-0 rounded')
                link.setAttribute('class', '')
                productImage.setAttribute('class', 'img-fluid d-inline-block rounded-top')
                caption.setAttribute('class', 'p-3')
                productName.setAttribute('class', 'col-12 border-bottom pb-3 font-weight-light')
                productPrice.setAttribute('class', 'col-6 d-inline text-muted font-weight-light')
                buyButton.setAttribute('class', 'btn btn-muted text-muted d-inline font-weight-light')

                //link URL
                link.href = 'product.html' + '?productId=' + jsonResponse[i]._id + '&apiName=' + apiName

                //cart href
                const cartButton = document.getElementById('cart-button');
                cartButton.href = 'cart.html' + '?apiName=' + apiName;

                //image populate
                productImage.src = jsonResponse[i].imageUrl

                //name populate
                productName.innerHTML = jsonResponse[i].name

                //price populate
                const correctPrice = jsonResponse[i].price / 100;
                productPrice.innerHTML = `$${correctPrice.toFixed(2)}`

                //buyButton text
                buyButton.innerHTML = 'Buy'

                //append to one another
                document.getElementById('populate').appendChild(bootstrapClass).appendChild(thumbnail).appendChild(link).appendChild(productImage)
                link.appendChild(productImage)
                link.appendChild(caption).appendChild(productName)
                caption.appendChild(productPrice)
                caption.appendChild(buyButton)

            }

        } else {
            throw new Error('We couldn\'t generate our product page right now. Please try later')
        }

    } catch (error) {
        document.body.innerHTML = error;
    }
}

callApi('http://localhost:3000/api/' + apiName);
