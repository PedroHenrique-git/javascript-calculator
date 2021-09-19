const calculator = (function () {
    const calculator = document.querySelector('.calculator-container');
    const visor = calculator.querySelector('.calculator-visor');
    const prevExpression = visor.querySelector('.prev-expression');
    const currentExpression = visor.querySelector('.current-expression');

    const updateVisor = (visor, value) => (visor.innerText = value);

    const resolveExpression = (num1, num2, operator) => {
        const n1 = Number(num1);
        const n2 = Number(num2);

        let result = 0;

        switch (operator) {
            case '+':
                result = n1 + n2;
                break;
            case '-':
                result = n1 - n2;
                break;
            case '*':
                result = n1 * n2;
                break;
            case '/':
                result = n1 / n2;
                break;
            default:
                result = 0;
                break;
        }

        if (!isNaN(result)) {
            if (String(result).length <= 12) return result;
            return result.toFixed(8);
        }
        return 0;
    };

    const calculatorData = {
        number1: '',
        number2: '',
        operator: '',
        clearData: function () {
            (this.number1 = ''), (this.number2 = ''), (this.operator = '');
        },
        clearNumber1: function () {
            this.number1 = '';
        },
        clearNumber2: function () {
            this.number2 = '';
        },
        setNumber1: function (value) {
            this.number1 += value;
        },
        setNumber2: function (value) {
            this.number2 += value;
        },
        setOperator: function (value) {
            this.operator = value;
        },
        getNumber1: function () {
            return this.number1;
        },
        getNumber2: function () {
            return this.number2;
        },
        getOperator: function () {
            return this.operator;
        },
    };

    function init() {
        document.addEventListener('click', (e) => {
            const target = e.target;
            const targetClasses = target.className.split(' ');

            if (
                (targetClasses.includes('btn-number') ||
                    targetClasses.includes('btn-dot')) &&
                !calculatorData.getOperator()
            ) {
                calculatorData.setNumber1(target.value);
                updateVisor(currentExpression, calculatorData.getNumber1());
            }

            if (
                (targetClasses.includes('btn-number') ||
                    targetClasses.includes('btn-dot')) &&
                calculatorData.getOperator()
            ) {
                calculatorData.setNumber2(target.value);
                updateVisor(currentExpression, calculatorData.getNumber2());
                updateVisor(
                    prevExpression,
                    `${calculatorData.getNumber1()} ${calculatorData.getOperator()}`
                );
            }

            if (
                targetClasses.includes('btn-exp') &&
                calculatorData.getNumber1() &&
                calculatorData.getNumber2() &&
                calculatorData.getOperator()
            ) {
                const result = resolveExpression(
                    calculatorData.getNumber1(),
                    calculatorData.getNumber2(),
                    calculatorData.getOperator()
                );
                calculatorData.clearData();
                calculatorData.setNumber1(String(result));
                calculatorData.setNumber2('');
                calculatorData.setOperator(target.value);
            }

            if (targetClasses.includes('btn-exp')) {
                calculatorData.setOperator(target.value);
            }

            if (
                targetClasses.includes('btn-exp') &&
                !calculatorData.getNumber1()
            ) {
                calculatorData.setNumber1('0');
            }

            if (targetClasses.includes('btn-equal')) {
                const result = resolveExpression(
                    calculatorData.getNumber1(),
                    calculatorData.getNumber2(),
                    calculatorData.getOperator()
                );
                updateVisor(
                    prevExpression,
                    `${calculatorData.getNumber1()} ${calculatorData.getOperator()} ${calculatorData.getNumber2()} = `
                );
                updateVisor(currentExpression, result);
                calculatorData.clearData();
                calculatorData.setNumber1(String(result));
            }

            if (targetClasses.includes('btn-clear')) {
                calculatorData.clearData();
                updateVisor(currentExpression, '');
                updateVisor(prevExpression, '');
            }

            if (targetClasses.includes('btn-delete')) {
                const number1 = calculatorData.getNumber1().slice(0, -1);
                calculatorData.clearNumber1();
                calculatorData.setNumber1(String(number1));
                updateVisor(currentExpression, number1);
            }
        });
    }

    return {
        init,
    };
})();

calculator.init();
