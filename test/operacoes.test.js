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

  // 1) Operações básicas: zeros/negativos/igualdade/comutatividade
  test('soma: zeros, negativos e comutatividade', () => {
    expect(soma(0, 0)).toBe(0);
    expect(soma(3, -2)).toBe(1);
    expect(soma(-5, -5)).toBe(-10);
    expect(soma(2, 3)).toBe(soma(3, 2));
  });

  test('subtracao: zero e igualdade', () => {
    expect(subtracao(0, 5)).toBe(-5);
    expect(subtracao(5, 0)).toBe(5);
    expect(subtracao(3, 3)).toBe(0); // cobre borda a === b (mata >→>= em mutação relacionada)
  });

  test('multiplicacao: identidade e sinais', () => {
    expect(multiplicacao(0, 99)).toBe(0);
    expect(multiplicacao(1, 7)).toBe(7);
    expect(multiplicacao(-3, 2)).toBe(-6);
    expect(multiplicacao(-3, -2)).toBe(6);
  });

  test('divisao: sinais e exceção já coberta no base', () => {
    expect(divisao(10, 2)).toBe(5);
    expect(divisao(-10, 2)).toBe(-5);
    expect(divisao(10, -2)).toBe(-5);
  });

  // 2) Potência / Raiz / Resto / Fatorial
  test('potencia: expoentes especiais', () => {
    expect(potencia(2, 0)).toBe(1);
    expect(potencia(5, 1)).toBe(5);
    expect(potencia(-2, 2)).toBe(4);
  });

  test('raizQuadrada: lança erro para negativo e aceita não perfeito', () => {
    expect(() => raizQuadrada(-1)).toThrow();  // seu código lança erro (não retorna NaN)
    const r = raizQuadrada(2);                 // não perfeito: ainda deve ser número
    expect(typeof r).toBe('number');
  });

  test('restoDivisao: sinal negativo do dividendo', () => {
    expect(restoDivisao(-7, 3)).toBe(-1); // JS: -7 % 3 === -1
  });

  test('fatorial: base 0 e 1', () => {
    expect(fatorial(0)).toBe(1);
    expect(fatorial(1)).toBe(1);
  });

  // 3) Arrays e agregações
  test('mediaArray: vazio retorna 0; unitário e floats', () => {
    expect(mediaArray([])).toBe(0);
    expect(mediaArray([5])).toBe(5);
    expect(mediaArray([1, 2])).toBe(1.5);
  });

  test('somaArray: inclui negativos', () => {
    expect(somaArray([-2, 2, -3, 3])).toBe(0);
  });

  test('maximoArray/minimoArray: erros para vazio e casos com negativos/iguais', () => {
    expect(() => maximoArray([])).toThrow();
    expect(() => minimoArray([])).toThrow();
    expect(maximoArray([-5, -1, -10])).toBe(-1);
    expect(minimoArray([3, 3, 3])).toBe(3);
  });

  test('produtoArray: vazio retorna 1; inclui zero e negativos', () => {
    expect(produtoArray([])).toBe(1);
    expect(produtoArray([2, 0, 3])).toBe(0);
    expect(produtoArray([-2, 3])).toBe(-6);
  });

  test('medianaArray: erro para vazio; par e unitário', () => {
    expect(() => medianaArray([])).toThrow();
    expect(medianaArray([3, 1, 4, 2])).toBe(2.5); // par
    expect(medianaArray([7])).toBe(7);            // unitário
  });

  // 4) Formas numéricas e arredondamentos
  test('valorAbsoluto: zero e negativo', () => {
    expect(valorAbsoluto(0)).toBe(0);
    expect(valorAbsoluto(-8)).toBe(8);
  });

  test('arredondar: negativos e frações', () => {
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
  test('isPar/isImpar: cobre zero e pares/ímpares', () => {
    expect(isPar(0)).toBe(true);
    expect(isImpar(0)).toBe(false);
    expect(isPar(3)).toBe(false);
    expect(isImpar(4)).toBe(false);
  });

  test('isMaiorQue/isMenorQue/isEqual: igualdade como borda (-0 === 0 em JS)', () => {
    expect(isMaiorQue(5, 5)).toBe(false); // borda
    expect(isMenorQue(5, 5)).toBe(false); // borda
    expect(isEqual(-0, 0)).toBe(true);
  });

  // 6) Porcentagens
  test('calcular/aumentar/diminuir porcentagem: zeros e casos simples', () => {
    expect(calcularPorcentagem(0, 200)).toBe(0);
    expect(calcularPorcentagem(50, 200)).toBe(100);
    expect(aumentarPorcentagem(100, 0)).toBe(100);
    expect(aumentarPorcentagem(100, 10)).toBeCloseTo(110);
    expect(diminuirPorcentagem(100, 10)).toBeCloseTo(90);
    expect(diminuirPorcentagem(100, 0)).toBe(100);
  });

  // 7) Sinal / Inverso
  test('inverterSinal: zero e negativos', () => {
    expect(Object.is(inverterSinal(0), -0)).toBe(true);
    expect(inverterSinal(-5)).toBe(5);
  });

  test('inverso: positivo, negativo e erro no zero', () => {
    expect(inverso(4)).toBeCloseTo(0.25);
    expect(inverso(-4)).toBeCloseTo(-0.25);
    expect(() => inverso(0)).toThrow();
  });

  // 8) Trigonometria / Logs
  test('seno/cosseno/tangente: pontos especiais (usar closeTo por floating)', () => {
    expect(seno(0)).toBeCloseTo(0);
    expect(cosseno(Math.PI)).toBeCloseTo(-1);
    expect(tangente(Math.PI)).toBeCloseTo(0);
  });

  test('logaritmoNatural/logaritmoBase10: neutros clássicos', () => {
    expect(logaritmoNatural(Math.E)).toBeCloseTo(1);
    expect(logaritmoBase10(1)).toBeCloseTo(0);
  });

  // 9) Geometria
  test('areaCirculo: raio zero', () => {
    expect(areaCirculo(0)).toBe(0);
  });

  test('areaRetangulo/perimetroRetangulo: bordas com zero', () => {
    expect(areaRetangulo(0, 5)).toBe(0);
    expect(perimetroRetangulo(0, 5)).toBe(10);
  });

  // 10) Hipotenusa e conversões
  test('hipotenusa: cateto zero', () => {
    expect(hipotenusa(0, 5)).toBe(5);
  });

  test('graus<->radianos: roundtrip', () => {
    const g = 180;
    const r = grausParaRadianos(g);
    expect(radianosParaGraus(r)).toBeCloseTo(g);
  });

  // 11) MDC/MMC, divisibilidade, primalidade e Fibonacci
  test('mdc: inclui zero (Euclides)', () => {
    expect(mdc(0, 5)).toBe(5);
    expect(mdc(12, 8)).toBe(4);
  });

  test('mmc: inclui zero e caso comum', () => {
    expect(mmc(0, 10)).toBe(0);   // pelo seu contrato atual
    expect(mmc(6, 8)).toBe(24);
  });

  test('isDivisivel: caso falso e sinais', () => {
    expect(isDivisivel(10, 3)).toBe(false);
    expect(isDivisivel(-10, 5)).toBe(true);
  });

  test('isPrimo: 0, 1, composto e primo', () => {
    expect(isPrimo(0)).toBe(false);
    expect(isPrimo(1)).toBe(false);
    expect(isPrimo(49)).toBe(false);
    expect(isPrimo(97)).toBe(true);
  });

  test('fibonacci: casos pequenos para evitar explosão recursiva', () => {
    expect(fibonacci(0)).toBe(0);
    expect(fibonacci(1)).toBe(1);
    expect(fibonacci(6)).toBe(8);
  });

  // 12) Clamp e escala simples
  test('clamp: abaixo, acima e dentro (inclui bordas)', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);   // abaixo
    expect(clamp(11, 0, 10)).toBe(10);  // acima
    expect(clamp(0, 0, 10)).toBe(0);    // borda inf
    expect(clamp(10, 0, 10)).toBe(10);  // borda sup
  });

  // 13) Conversões de temperatura
  test('Celsius<->Fahrenheit: roundtrip aproximado', () => {
    const c = 23;
    const f = celsiusParaFahrenheit(c);
    expect(fahrenheitParaCelsius(f)).toBeCloseTo(c);
  });

  // 14) Dobro/Triplo/Metade: sinais e zero
  test('dobro/triplo/metade: cobre negativos e zero', () => {
    expect(dobro(0)).toBe(0);
    expect(triplo(-3)).toBe(-9);
    expect(metade(-8)).toBe(-4);
  });

  describe('Cobertura extra de bordas/erros', () => {
    test('fatorial: lança erro para negativo', () => {
      expect(() => fatorial(-1)).toThrow(); // cobre ramo de erro
    });

    test('mdc: quando segundo argumento já é zero (loop não executa)', () => {
      expect(mdc(5, 0)).toBe(5); // cobre caminho while(b) === false logo de cara
    });

    test('raizQuadrada: borda n === 0', () => {
      expect(raizQuadrada(0)).toBe(0); // cobre retorno direto sem erro
    });

    test('restoDivisao: divisor negativo', () => {
      // Em JS: 7 % -3 === 1; -7 % -3 === -1
      expect(restoDivisao(7, -3)).toBe(1);
      expect(restoDivisao(-7, -3)).toBe(-1);
    });

    test('isPrimo: n === 2 (loop não roda, retorna true)', () => {
      expect(isPrimo(2)).toBe(true);
    });
  });
});