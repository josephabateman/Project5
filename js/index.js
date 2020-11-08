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

                //wrap everything in product.html link plus Q-parameter + bootstrap colums
                const column = document.createElement('div');
                column.setAttribute('class', 'col-auto')
//                column.setAttribute('class', 'column')
                document.getElementById('populate').appendChild(column)


                const productLink = document.createElement('a');
                productLink.href = 'product.html' + '?productId=' + jsonResponse[i]._id + '&apiName=' + apiName;
                column.appendChild(productLink)

                //populate div and add name for attribute id
                const div = document.createElement('div')
                //sets div id and removes spaces
                div.setAttribute('id', jsonResponse[i].name.replace(/ /gi, ''))
                productLink.appendChild(div)

                //populate img & append to div
                const newImg = document.createElement('IMG');
                newImg.src = jsonResponse[i].imageUrl
                div.appendChild(newImg)

                //populate name & append to div
                const name = document.createElement('h2');
                name.innerHTML = jsonResponse[i].name
                div.appendChild(name)

                //populate price & append to div
                const correctPrice = jsonResponse[i].price / 100;
                const price = document.createElement('h3');
                price.innerHTML = `$${correctPrice.toFixed(2)}`;
                div.appendChild(price)
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
