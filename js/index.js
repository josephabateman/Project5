/*to do

bootstrap

*/
const apiName = 'teddies'

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

                //image populate
                productImage.src = jsonResponse[i].imageUrl

                //what does this do?
                //populate div and add name for attribute id
                //                const div = document.createElement('div')
                //                //sets div id and removes spaces
                //                div.setAttribute('id', jsonResponse[i].name.replace(/ /gi, ''))
                //                productLink.appendChild(div)

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





                //wrap everything in product.html link plus Q-parameter + bootstrap colums
                //                const column = document.createElement('div');
                //                column.setAttribute('class', 'col-auto')
                //                //                column.setAttribute('class', 'column')
                //                document.getElementById('populate').appendChild(column)
                //
                //
                //                const productLink = document.createElement('a');
                //                productLink.href = 'product.html' + '?productId=' + jsonResponse[i]._id + '&apiName=' + apiName;
                //                column.appendChild(productLink)
                //
                //                //populate div and add name for attribute id
                //                const div = document.createElement('div')
                //                //sets div id and removes spaces
                //                div.setAttribute('id', jsonResponse[i].name.replace(/ /gi, ''))
                //                productLink.appendChild(div)
                //
                //                //populate img & append to div
                //                const newImg = document.createElement('IMG');
                //                newImg.src = jsonResponse[i].imageUrl
                //                div.appendChild(newImg)
                //
                //                //populate name & append to div
                //                const name = document.createElement('h2');
                //                name.innerHTML = jsonResponse[i].name
                //                div.appendChild(name)
                //
                //                //populate price & append to div
                //                const correctPrice = jsonResponse[i].price / 100;
                //                const price = document.createElement('h3');
                //                price.innerHTML = `$${correctPrice.toFixed(2)}`;
                //                div.appendChild(price)
            }

            //add cartNum to index below


        } else {
            throw new Error('We couldn\'t generate our product page right now. Please try later')
        }

    } catch (error) {
        document.body.innerHTML = error;
    }
}

callApi('http://localhost:3000/api/' + apiName);
