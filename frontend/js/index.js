"use strict"

const ContainerCardapio = document.querySelector('#cardapio')
const carrinhoItens = document.querySelector(".carrinho-itens")
const subTotal = document.querySelector('#subtotal')

//barra lateral
class AsideBars {
    constructor(mobileMenu, navList, navListLink, carrinhoExit, carrinhoBtn, carrinho, carinhoLinks) {
        //mobile
        this.mobileMenu = document.querySelector(mobileMenu)
        this.navList = document.querySelector(navList)
        this.navListLink = document.querySelectorAll(navListLink)
        this.activeClass = "active"
        //carrinho
        this.carrinhoExit = document.querySelector(carrinhoExit)
        this.carrinhoBtn = document.querySelector(carrinhoBtn)
        this.carrinho = document.querySelector(carrinho)
        this.carrinhoLinks = document.querySelectorAll(this.carrinhoLinks)
        this.exitClass = "exit"
    }

    animeteLinks() {
        this.navListLink.forEach((link, index) => {
            link.style.animation ? (link.style.animation = "")
                : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`)
        })
    }

    //mobile
    handleClickMobile() {
        this.navList.classList.toggle(this.activeClass)
        this.mobileMenu.classList.toggle(this.activeClass)
        this.animeteLinks()
    }

    //ativar carrinho
    handleClickCarrinho() {
        this.carrinho.classList.toggle(this.activeClass)
        this.carrinhoBtn.classList.toggle(this.activeClass)
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click", () => this.handleClickMobile())
        this.carrinhoBtn.addEventListener("click", () => this.handleClickCarrinho())
        this.carrinhoExit.addEventListener("click", () => this.handleClickCarrinho())
    }

    init() {
        if (this.mobileMenu) {
            this.addClickEvent()
        }
        return this
    }
}

const asideBars = new AsideBars(".mobile-menu", ".nav-list", ".nav-list li", ".exit-carrinho", ".carrinho-btn", ".carrinho", ".carrinho ")

asideBars.init()

// ------------------------------------------------------


//Cardapio

class Cardapio {
    
    Carrinho = []
    subtotal = 0

   /*
            for(let i = 0; i < this.Carrinho.length; i++) {
                const menos = document.getElementsByClassName('menos')
                const numeroPizzas = document.getElementsByClassName('numeroPizzas')
                const mais = document.getElementsByClassName('mais')

                subTotalPizza = this.Carrinho[i].preco * this.Carrinho[i].quantidade
                this.Carrinho[i].subTotalPizza = subTotalPizza

                menos[i].addEventListener('click', () => {
                    this.Carrinho[i].quantidade--
                    if(this.Carrinho[i].quantidade <= 0) {
                        //remover card do produto
                        console.log("item removido")
                    } else {
                        //quantidade de pizzas
                        console.log(this.Carrinho[i].quantidade)
                        numeroPizzas[i].innerHTML = this.Carrinho[i].quantidade 

                        //subtotal das pizzas
                        subTotalPizza = this.Carrinho[i].preco * this.Carrinho[i].quantidade
                        this.Carrinho[i].subTotalPizza = subTotalPizza 
                        console.log(this.Carrinho[i].subTotalPizza)

                        console.log(this.subtotal)
                    }              
                    
                })

                mais[i].addEventListener('click', () => {
                    this.Carrinho[i].quantidade++
                    if(this.Carrinho[i].quantidade <= 10) {
                        //quantidade de pizzas
                        console.log(this.Carrinho[i].quantidade)
                        numeroPizzas[i].innerHTML = this.Carrinho[i].quantidade 

                        //subtotal das pizzas
                        subTotalPizza = this.Carrinho[i].preco * this.Carrinho[i].quantidade
                        this.Carrinho[i].subTotalPizza = subTotalPizza 
                        console.log(this.Carrinho[i].subTotalPizza)

                        this.subtotal = this.Carrinho[i].subTotalPizza
                        if(this.Carrinho.length > 1) {
                            this.subtotal = this.subtotal + this.Carrinho[this.Carrinho.length - 1].subTotalPizza
                        }

                        console.log(this.subtotal)

                    } else {
                        console.log("numero maximo")
                    }
                    
                })
                
            }

            //arrumar para mostra subtotal correto
                if(this.Carrinho.length > 1) {
                    this.subtotal = this.subtotal + this.Carrinho[this.Carrinho.length - 1].subTotalPizza
                } else {
                    this.subtotal = this.Carrinho[0].subTotalPizza
                }
            
                console.log(this.subtotal)
                
            

            
            


    }*/

}

Cardapio.prototype.ShowAllItems = async function() {
    const response = await fetch('http://localhost/pizzaria/backend/db/Pizzaria.json', {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    })

    const data = await response.json()

    if(data.Cardapio.length > 0) {
        data.Cardapio.map((pizza) => {

            console.log(ContainerCardapio)

            ContainerCardapio.innerHTML += `
            <div class="cardapio-card" id="${pizza.id}">
                <img class="cardapio-img" src="${pizza.img}" alt="${pizza.nome}">
                <p class="cardapio-description">${pizza.nome}</p>
                <p class="cardapio-price">R$ ${pizza.preco}</p>
                <button class="cardapio-btn" type="submit">Adicionar <img   src="img/iconCar.svg" alt="icone carrinho"></button>
            </div>
            `
        })
        console.log(data)
        this.addToCarrinho(data)
    } else {
        ContainerCardapio.innerHTML = `
            <h3>Nenhum item disponivel</h3>
        `
    }
}

Cardapio.prototype.addToCarrinho = function(data) {
    const BtnAddPizza = document.querySelectorAll('.cardapio-btn')
    
    BtnAddPizza.forEach(BtnAddPizza => {
        BtnAddPizza.addEventListener('click', () => {
             const pizza = data.Cardapio[BtnAddPizza.parentElement.id]

             for (let i = 0; i < this.Carrinho.length; i++) {
                if (this.Carrinho[i].id == pizza.id) {
                    console.log('item repetido')
                    return
                }
            }

            this.Carrinho.push(pizza)
            this.ShowAllItensCarrinho()
            console.log(this.Carrinho)
        })
    })
}

Cardapio.prototype.ShowAllItensCarrinho = function() {
    if (this.Carrinho.length > 0) {
        console.log("Numero de itens no carrinho " + this.Carrinho.length)

        // apaga o carrinho-card antigo e coloca o novo com os novos items
        carrinhoItens.innerHTML = ''

        this.Carrinho.map((pizza) => {
            carrinhoItens.innerHTML += `
                <div class="carrinho-card" id=${pizza.id}>
                    <div class="item-description">
                        <img src="${pizza.img}" alt="${pizza.nome}">
                        <p><strong> ${pizza.nome}</strong> </p>
                    </div>
                    <div class="item-quantidade">
                        <p>${pizza.preco}</p>
                        <div id='${pizza.id}' class="item-quantidade-controller">
                            <button class="menos">-</button>
                            <p class="numeroPizzas">${pizza.quantidade = 1}</p>
                            <button class="mais">+</button>
                        </div>
                    </div>
                </div>`   

                this.loadSubTotal()
                subTotal.innerHTML = `R$${this.subtotal.toFixed(2)}`
                                                
        })
        this.altQtdPizza()

    } else {
        carrinhoItens.innerHTML = '<h3>Carrinho Vazio</h3>'
    }
}

Cardapio.prototype.altQtdPizza = function() {
    const quantidadePizza = document.querySelectorAll('.numeroPizzas')
    const menos = document.querySelectorAll('.menos')
    const mais = document.querySelectorAll('.mais')

    for(let i = 0; i < this.Carrinho.length; i++) {
        menos[i].addEventListener('click', () => {
            if(this.Carrinho[i].quantidade <= 0) {
                console.log('remove div')
            } else {
                this.Carrinho[i].quantidade--
                quantidadePizza[i].textContent = this.Carrinho[i].quantidade
                this.loadSubTotal()
                subTotal.innerHTML = `R$${this.subtotal.toFixed(2)}`
            }
        })

        mais[i].addEventListener('click', () => {
            if(this.Carrinho[i].quantidade >= this.Carrinho[i].disponivel) {
                console.log('quantidade maxima atingida')
            } else {
                this.Carrinho[i].quantidade++
                quantidadePizza[i].textContent = this.Carrinho[i].quantidade
                this.loadSubTotal()
                subTotal.innerHTML = `R$${this.subtotal.toFixed(2)}`
            }
        })
    }

}

Cardapio.prototype.loadSubTotal = function() {
    this.subtotal = 0
    this.Carrinho.forEach((pizza) => {
        this.subtotal += pizza.quantidade * pizza.preco
    })
}


const cardapio = new Cardapio

cardapio.ShowAllItems()

console.log("ola")

