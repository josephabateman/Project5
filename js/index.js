/*to do

bootstrap

*/
const apiName = 'cameras'

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

                //ids
                thumbnail.setAttribute('id', 'thumbnail')
                link.setAttribute('id', 'link-tag')
                productImage.setAttribute('id', 'img-tag')
                caption.setAttribute('id', 'caption-tag')
                productName.setAttribute('id', 'name-tag')
                productPrice.setAttribute('id', 'price-tag')

                //bootstrap classes
                bootstrapClass.setAttribute('class', 'col-md-5')
                thumbnail.setAttribute('class', 'thumbnail')
                link.setAttribute('class', '')
                productImage.setAttribute('class', 'img-fluid')
                caption.setAttribute('class', '')
                productName.setAttribute('class', '')
                productPrice.setAttribute('class', '')

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

                //append to one another
                document.getElementById('populate').appendChild(bootstrapClass).appendChild(thumbnail).appendChild(link).appendChild(productImage)
                link.appendChild(productImage)
                link.appendChild(caption).appendChild(productName)
                caption.appendChild(productPrice)




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
