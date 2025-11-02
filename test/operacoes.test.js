// test/operacoes.edges.test.js
const {
  soma, subtracao, multiplicacao, divisao, potencia, raizQuadrada, restoDivisao,
  fatorial, mediaArray, somaArray, maximoArray, minimoArray, valorAbsoluto,
  arredondar, isPar, isImpar, calcularPorcentagem, aumentarPorcentagem,
  diminuirPorcentagem, inverterSinal, seno, cosseno, tangente, logaritmoNatural,
  logaritmoBase10, arredondarParaBaixo, arredondarParaCima, hipotenusa,
  grausParaRadianos, radianosParaGraus, mdc, mmc, isPrimo, fibonacci,
  produtoArray, clamp, isDivisivel, celsiusParaFahrenheit, fahrenheitParaCelsius,
  inverso, areaCirculo, areaRetangulo, perimetroRetangulo, isMaiorQue,
  isMenorQue, isEqual, medianaArray, dobro, triplo, metade
} = require('../src/operacoes');

describe('Casos de borda e ramos – suíte complementar', () => {
  // 1) Operações básicas
  test('soma: zeros, negativos e comutatividade', () => {
    expect(soma(0, 0)).toBe(0);
    expect(soma(3, -2)).toBe(1);
    expect(soma(-5, -5)).toBe(-10);
    expect(soma(2, 3)).toBe(soma(3, 2));
  });

  test('subtracao: zero e igualdade', () => {
    expect(subtracao(0, 5)).toBe(-5);
    expect(subtracao(5, 0)).toBe(5);
    expect(subtracao(3, 3)).toBe(0);
  });

  test('multiplicacao: identidade e sinais', () => {
    expect(multiplicacao(0, 99)).toBe(0);
    expect(multiplicacao(1, 7)).toBe(7);
    expect(multiplicacao(-3, 2)).toBe(-6);
    expect(multiplicacao(-3, -2)).toBe(6);
  });

  test('divisao: sinais (erro b=0 já coberto na base)', () => {
    expect(divisao(10, 2)).toBe(5);
    expect(divisao(-10, 2)).toBe(-5);
    expect(divisao(10, -2)).toBe(-5);
  });

  // 2) Potência / Raiz / Resto / Fatorial
  test('potencia: expoentes especiais', () => {
    expect(potencia(2, 0)).toBe(1);
    expect(potencia(5, 1)).toBe(5);
    expect(potencia(-2, 2)).toBe(4);
    expect(potencia(-3, 3)).toBe(-27);
  });

  test('raizQuadrada: negativo lança erro; 0 e não perfeito', () => {
    expect(() => raizQuadrada(-1)).toThrow();
    expect(raizQuadrada(0)).toBe(0);
    expect(typeof raizQuadrada(2)).toBe('number');
  });

  test('restoDivisao: sinais e divisor 0 (NaN)', () => {
    expect(restoDivisao(-7, 3)).toBe(-1);
    expect(restoDivisao(7, -3)).toBe(1);
    expect(restoDivisao(-7, -3)).toBe(-1);
    expect(Number.isNaN(restoDivisao(1, 0))).toBe(true);
  });

  test('fatorial: bases 0 e 1; negativo lança erro', () => {
    expect(fatorial(0)).toBe(1);
    expect(fatorial(1)).toBe(1);
    expect(() => fatorial(-1)).toThrow();
    expect(fatorial(2)).toBe(2);
    expect(fatorial(3)).toBe(6);
  });

  // 3) Arrays e agregações
  test('mediaArray: vazio 0; unitário; floats', () => {
    expect(mediaArray([])).toBe(0);
    expect(mediaArray([5])).toBe(5);
    expect(mediaArray([1, 2])).toBe(1.5);
    expect(mediaArray([0.1, 0.2, 0.3])).toBeCloseTo(0.2);
  });

  test('somaArray: negativos e vazio', () => {
    expect(somaArray([-2, 2, -3, 3])).toBe(0);
    expect(somaArray([])).toBe(0);
  });

  test('maximoArray/minimoArray: vazio lança; unitário; negativos/iguais', () => {
    expect(() => maximoArray([])).toThrow();
    expect(() => minimoArray([])).toThrow();
    expect(maximoArray([-5, -1, -10])).toBe(-1);
    expect(minimoArray([3, 3, 3])).toBe(3);
    expect(maximoArray([-1])).toBe(-1);
    expect(minimoArray([-1])).toBe(-1);
  });

  test('produtoArray: vazio 1; inclui zero/negativos/floats', () => {
    expect(produtoArray([])).toBe(1);
    expect(produtoArray([2, 0, 3])).toBe(0);
    expect(produtoArray([-2, 3])).toBe(-6);
    expect(produtoArray([1.5, 2])).toBeCloseTo(3);
    expect(produtoArray([-1.5, 2])).toBeCloseTo(-3);
  });

  test('medianaArray: vazio lança; par/ímpar; negativos/duplicatas', () => {
    expect(() => medianaArray([])).toThrow();
    expect(medianaArray([3, 1, 4, 2])).toBe(2.5);
    expect(medianaArray([7])).toBe(7);
    expect(medianaArray([-5, 100, 0])).toBe(0);
    expect(medianaArray([2, 2, 4, 4])).toBe(3);
  });

  // 4) Formas numéricas e arredondamentos
  test('valorAbsoluto: zero e negativo', () => {
    expect(valorAbsoluto(0)).toBe(0);
    expect(valorAbsoluto(-8)).toBe(8);
  });

  test('arredondar: negativos e limiares .5', () => {
    expect(arredondar(1.49)).toBe(1);
    expect(arredondar(1.5)).toBe(2);
    expect(arredondar(-1.2)).toBe(-1);
    expect(arredondar(-1.6)).toBe(-2);
  });

  test('arredondarParaBaixo/ParaCima: negativos', () => {
    expect(arredondarParaBaixo(-1.2)).toBe(-2);
    expect(arredondarParaCima(-1.2)).toBe(-1);
  });

  // 5) Par/Ímpar e comparações
  test('isPar/isImpar: zero/positivos/negativos', () => {
    expect(isPar(0)).toBe(true);
    expect(isImpar(0)).toBe(false);
    expect(isPar(3)).toBe(false);
    expect(isImpar(4)).toBe(false);
    expect(isPar(-2)).toBe(true);
    expect(isImpar(-3)).toBe(true);
  });

  test('isMaiorQue/isMenorQue/isEqual: bordas e NaN', () => {
    expect(isMaiorQue(5, 5)).toBe(false);
    expect(isMenorQue(5, 5)).toBe(false);
    expect(isEqual(-0, 0)).toBe(true);
    expect(isEqual(NaN, NaN)).toBe(false);
  });

  // 6) Porcentagens
  test('calcular/aumentar/diminuir porcentagem: zeros, negativos e decimais', () => {
    expect(calcularPorcentagem(0, 200)).toBe(0);
    expect(calcularPorcentagem(50, 200)).toBe(100);
    expect(calcularPorcentagem(12.5, 80)).toBe(10);
    expect(aumentarPorcentagem(100, 0)).toBe(100);
    expect(aumentarPorcentagem(100, 10)).toBeCloseTo(110);
    expect(aumentarPorcentagem(200, 12.5)).toBeCloseTo(225);
    expect(diminuirPorcentagem(100, 10)).toBeCloseTo(90);
    expect(diminuirPorcentagem(100, 0)).toBe(100);
    expect(diminuirPorcentagem(200, 12.5)).toBeCloseTo(175);
    expect(calcularPorcentagem(-20, 200)).toBe(-40);
    expect(aumentarPorcentagem(100, -10)).toBeCloseTo(90);
    expect(diminuirPorcentagem(100, -10)).toBeCloseTo(110);
  });

  // 7) Sinal / Inverso
  test('inverterSinal: -0, negativo, positivo', () => {
    expect(Object.is(inverterSinal(0), -0)).toBe(true);
    expect(inverterSinal(-5)).toBe(5);
    expect(inverterSinal(7)).toBe(-7);
  });

  test('inverso: positivo, negativo, fracionário e erro zero', () => {
    expect(inverso(4)).toBeCloseTo(0.25);
    expect(inverso(-4)).toBeCloseTo(-0.25);
    expect(inverso(0.5)).toBeCloseTo(2);
    expect(() => inverso(0)).toThrow();
  });

  // 8) Trigonometria / Logs
  test('seno/cosseno/tangente: 0 e PI', () => {
    expect(seno(0)).toBeCloseTo(0);
    expect(cosseno(Math.PI)).toBeCloseTo(-1);
    expect(tangente(Math.PI)).toBeCloseTo(0);
  });

  test('seno/cosseno/tangente: PI/4', () => {
    const r = Math.PI / 4;
    expect(seno(r)).toBeCloseTo(Math.SQRT1_2);
    expect(cosseno(r)).toBeCloseTo(Math.SQRT1_2);
    expect(tangente(r)).toBeCloseTo(1);
  });

  test('logaritmoNatural/logaritmoBase10: neutros, zero e negativos', () => {
    expect(logaritmoNatural(Math.E)).toBeCloseTo(1);
    expect(logaritmoBase10(1)).toBeCloseTo(0);
    expect(logaritmoNatural(0)).toBe(-Infinity);
    expect(logaritmoBase10(0)).toBe(-Infinity);
    expect(Number.isNaN(logaritmoNatural(-1))).toBe(true);
    expect(Number.isNaN(logaritmoBase10(-10))).toBe(true);
    expect(logaritmoBase10(1000)).toBe(3);
  });

  // 9) Geometria
  test('areaCirculo: 0 e raio negativo (raio^2)', () => {
    expect(areaCirculo(0)).toBe(0);
    expect(areaCirculo(-5)).toBeCloseTo(Math.PI * 25);
  });

  test('areaRetangulo/perimetroRetangulo: zero e negativo (sem validação)', () => {
    expect(areaRetangulo(0, 5)).toBe(0);
    expect(perimetroRetangulo(0, 5)).toBe(10);
    expect(areaRetangulo(-3, 4)).toBe(-12);
    expect(perimetroRetangulo(-3, 4)).toBe(2);
  });

  // 10) Hipotenusa e conversões
  test('hipotenusa: cateto zero e 0,0', () => {
    expect(hipotenusa(0, 5)).toBe(5);
    expect(hipotenusa(0, 0)).toBe(0);
    expect(hipotenusa(2.5, 6)).toBeCloseTo(Math.sqrt(2.5 * 2.5 + 36));
  });

  test('graus<->radianos: roundtrip e negativos', () => {
    const g = 180;
    const r = grausParaRadianos(g);
    expect(radianosParaGraus(r)).toBeCloseTo(g);
    expect(grausParaRadianos(-180)).toBeCloseTo(-Math.PI);
    expect(radianosParaGraus(-Math.PI)).toBeCloseTo(-180);
    expect(grausParaRadianos(90)).toBeCloseTo(Math.PI / 2);
    expect(radianosParaGraus(Math.PI / 2)).toBeCloseTo(90);
  });

  // 11) MDC/MMC, divisibilidade, primalidade e Fibonacci
  test('mdc: zero direto e casos com negativos', () => {
    expect(mdc(0, 5)).toBe(5);
    expect(mdc(12, 8)).toBe(4);
    expect(Math.abs(mdc(-6, 8))).toBe(2);
    expect(mdc(5, 0)).toBe(5); // loop não executa
  });

  test('mmc: inclui zero, caso comum e negativos', () => {
    expect(mmc(0, 10)).toBe(0);
    expect(mmc(6, 8)).toBe(24);
    expect(Math.abs(mmc(-6, 8))).toBe(24);
  });

  test('isDivisivel: caso falso, sinais e divisor 0', () => {
    expect(isDivisivel(10, 3)).toBe(false);
    expect(isDivisivel(-10, 5)).toBe(true);
    expect(isDivisivel(10, -2)).toBe(true);
    expect(isDivisivel(10, 0)).toBe(false); // NaN === 0 é false
  });

  test('isPrimo: 0,1, composto, primo e base 2', () => {
    expect(isPrimo(0)).toBe(false);
    expect(isPrimo(1)).toBe(false);
    expect(isPrimo(49)).toBe(false);
    expect(isPrimo(97)).toBe(true);
    expect(isPrimo(2)).toBe(true); // laço não roda
  });

  test('fibonacci: bases e pequenos', () => {
    expect(fibonacci(0)).toBe(0);
    expect(fibonacci(1)).toBe(1);
    expect(fibonacci(2)).toBe(1);
    expect(fibonacci(3)).toBe(2);
    expect(fibonacci(6)).toBe(8);
  });

  // 12) Clamp e temperatura
  test('clamp: abaixo/acima/dentro/bordas e min==max', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(11, 0, 10)).toBe(10);
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
    expect(clamp(10, 10, 10)).toBe(10);
  });

  test('Celsius<->Fahrenheit: roundtrip e -40', () => {
    const c = 23;
    const f = celsiusParaFahrenheit(c);
    expect(fahrenheitParaCelsius(f)).toBeCloseTo(c);
    expect(celsiusParaFahrenheit(-40)).toBe(-40);
    expect(fahrenheitParaCelsius(-40)).toBe(-40);
  });

  // 13) Dobro/Triplo/Metade
  test('dobro/triplo/metade: zero, negativos e floats', () => {
    expect(dobro(0)).toBe(0);
    expect(triplo(-3)).toBe(-9);
    expect(metade(-8)).toBe(-4);
    expect(dobro(2.5)).toBeCloseTo(5);
    expect(triplo(1.5)).toBeCloseTo(4.5);
    expect(metade(2.5)).toBeCloseTo(1.25);
  });

  //extras


    test('somaArray: array vazio retorna 0', () => { expect(somaArray([])).toBe(0); });
  test('produtoArray: array unitário retorna o próprio', () => { expect(produtoArray([5])).toBe(5); });
  test('maximoArray: array unitário negativo', () => { expect(maximoArray([-1])).toBe(-1); });
  test('minimoArray: array unitário negativo', () => { expect(minimoArray([-1])).toBe(-1); });
  test('medianaArray: par com duplicatas', () => { expect(medianaArray([2, 2, 4, 4])).toBe(3); });
  test('fatorial: 2 e 3', () => { expect(fatorial(2)).toBe(2); expect(fatorial(3)).toBe(6); });
  test('calcularPorcentagem: 12.5% de 80', () => { expect(calcularPorcentagem(12.5, 80)).toBe(10); });
  test('aumentarPorcentagem: 200 em 12.5%', () => { expect(aumentarPorcentagem(200, 12.5)).toBeCloseTo(225); });
  test('diminuirPorcentagem: 200 em 12.5%', () => { expect(diminuirPorcentagem(200, 12.5)).toBeCloseTo(175); });
  test('isEqual: objetos com refs diferentes → false', () => { expect(isEqual({ a: 1 }, { a: 1 })).toBe(false); });
  test('isDivisivel: 10 por -2', () => { expect(isDivisivel(10, -2)).toBe(true); });
  test('mdc com negativo: |mdc(-6, 8)| === 2', () => { expect(Math.abs(mdc(-6, 8))).toBe(2); });
  test('mmc com negativo: |mmc(-6, 8)| === 24', () => { expect(Math.abs(mmc(-6, 8))).toBe(24); });
  test('areaCirculo: raio negativo (raio^2)', () => { expect(areaCirculo(-5)).toBeCloseTo(Math.PI * 25); });
  test('hipotenusa: ambos catetos 0', () => { expect(hipotenusa(0, 0)).toBe(0); });
  test('grausParaRadianos(90) e radianosParaGraus(PI/2)', () => {
    expect(grausParaRadianos(90)).toBeCloseTo(Math.PI / 2);
    expect(radianosParaGraus(Math.PI / 2)).toBeCloseTo(90);
  });
  test('Celsius <-> Fahrenheit: -40 é ponto de cruzamento', () => {
    expect(celsiusParaFahrenheit(-40)).toBe(-40);
    expect(fahrenheitParaCelsius(-40)).toBe(-40);
  });
  test('logaritmoBase10(1000) = 3', () => { expect(logaritmoBase10(1000)).toBe(3); });
});