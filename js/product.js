/*to do
-bootstrap
*/
const params = new URLSearchParams(document.location.search);
const productId = params.get('productId');
const apiName = params.get('apiName');

// AJAX function
const callApi = async (ApiToCall) => {
    try {
        const response = await fetch(ApiToCall);
        if (response.ok) {
            const jsonResponse = await response.json();

            //populate div and add name for attribute id
            const div = document.createElement('div')
            //sets div id and removes spaces
            div.setAttribute('id', jsonResponse.name.replace(/ /gi, ''))
            document.getElementById('indiv-product').appendChild(div)

            //populate img & append to div
            const newImg = document.createElement('IMG');
            newImg.src = jsonResponse.imageUrl
            div.appendChild(newImg)

            //populate name & append to div
            const name = document.createElement('h2');
            name.innerHTML = jsonResponse.name
            div.appendChild(name)

            //populate description & append to div
            const description = document.createElement('p');
            description.innerHTML = jsonResponse.description
            div.appendChild(description)

            //populate price & append to div
            const correctPrice = jsonResponse.price / 100;
            const price = document.createElement('h3');
            price.innerHTML = `$${correctPrice.toFixed(2)}`
            div.appendChild(price)

            //populate dropdown & append to div
            //i have chosen to populate dropdown from javascript in case the API has no options
            const optionKey = Object.keys(jsonResponse)[0];
            const optionValues = Object.values(jsonResponse)[0];

            const form = document.createElement('form');
            const label = document.createElement('label');
            const select = document.createElement('select');
            const input = document.createElement('input');

            //dropdown attributes
            form.setAttribute('action', '');
            label.setAttribute('for', 'options');
            label.innerHTML = `Select ${optionKey} `;
            select.setAttribute('name', 'option');
            select.setAttribute('id', 'option');
            input.setAttribute('type', 'submit')
            input.setAttribute('value', 'update cart')
            input.setAttribute('id', 'addToCart')

            let appendDropdown = div.appendChild(form).appendChild(label).appendChild(select)

            //loop through the different options
            for (let i of optionValues) {
                const option = document.createElement('option');
                option.setAttribute('value', i);
                option.innerHTML = i;
                appendDropdown.appendChild(option)
            }

            label.appendChild(input)

            function cartObject() {
                //add to cart
                const qty = document.getElementById('qty')
                //create cart object and default behaviour submit onclick
                const addToCart = document.getElementById('addToCart')
                addToCart.addEventListener('click', function (option) {
                    option.preventDefault();
                    location.reload();

                    //create order object which will be added to array via localStaorage
                    if (qty.value > 0) {
                        let cartObject = {
                            name: jsonResponse.name,
                            option: select.value,
                            price: correctPrice.toFixed(2),
                            id: productId,
                            quantity: qty.value,
                            imageUrl: jsonResponse.imageUrl
                        }
                        const localStKey = `${jsonResponse.name}, ${select.value}`
                        localStorage.setItem(localStKey, JSON.stringify(cartObject));
                    }
                });
            }
            cartObject();


        } else {
            throw new Error('We couldn\'t generate our product page right now. Please try later')
        }

    } catch (error) {
        document.body.innerHTML = error;
    }
}

callApi('http://localhost:3000/api/' + apiName + '/' + productId);
