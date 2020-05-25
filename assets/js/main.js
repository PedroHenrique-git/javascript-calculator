(function () {

    function Calculadora(){
        return {

            visor: document.querySelector('.resultado'),

            iniciar(){
                this.cliqueBotoes();
            },

            fazConta(){
                try{
                    let conta = eval(this.visor.value);
                    this.visor.value = String(conta);
                }catch(e){
                    alert('Conta inválida');
                }
            },

            cliqueBotoes(){
                document.addEventListener('click', e => {
                    const el = e.target;
                    if(el.classList.contains('btn-num')){
                        this.adicionaElementosNoVisor(el.innerText); 
                    }
                    if(el.classList.contains('btn-op')){
                        this.adicionaElementosNoVisor(el.innerText);
                    }
                    if(el.classList.contains('btn-igual')){
                        this.fazConta();
                    }
                    if(el.classList.contains('btn-clear')){
                        this.visor.value = '';
                    }
                    if(el.classList.contains('btn-apagar')){
                        let newValue = this.visor.value.slice(0,-1);
                        this.visor.value = newValue;
                    }
                });  
            },

            adicionaElementosNoVisor(valor){
                this.visor.value += valor;
            }
        }
    }

    const calculadora = Calculadora();
    calculadora.iniciar();

})();