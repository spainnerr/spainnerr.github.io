# Renderização da faixa de Möbius

A ilustração original usa `assets/mobius.svg`, gerado por
`generate-mobius.mjs`, e o navegador movimenta essa imagem com CSS.
O gerador original permanece como referência geométrica.

## Invariantes

- Superfície: raio 1,44, largura parametrizada de −0,6 a 0,6 e meia torção.
- Rotação estática da geometria: X = 0,88; Y = −0,34; Z = −0,48 radianos.
- Projeção: distância 7,8, escala 151, centro (360, 275), área 720 × 620.
- Movimento CSS preservado literalmente: `levitate 8s ease-in-out infinite`.
- Origem de transformação: 50% 55%; posição Y de 0 a −11 px; rotação de −2° a 2°.
- Câmera estática. A atualização não acrescenta movimento 3D.

## Acabamento

O renderizador independente utiliza a mesma equação com 236.544 triângulos,
normais analíticas, material azul com BRDF GGX/Smith/Schlick (rugosidade 0,29,
metallic 0,28), três fontes de estúdio com 24 amostras por fonte, sombras
traçadas contra a própria geometria e 40 amostras de oclusão ambiente.
Painéis de estúdio pré-filtrados fornecem reflexos amplos. O sombreamento é
calculado na malha densa e interpolado com correção de perspectiva em luz linear.

O pigmento usa uma função contínua na identificação `(2π,v) = (0,−v)`,
evitando criar uma falsa separação entre dois lados. A imagem tem sombra suave
e bloom discreto restrito aos realces, com compressão sutil de altas luzes.
O fundo transparente se integra ao estúdio claro do site.

O mestre é renderizado em 5.760 × 4.960, com redução Lanczos (supersampling,
não MSAA/TAA). O site escolhe imagens WebP de 1.280, 2.560 ou 3.840 pixels de
largura. A proporção CSS permanece exatamente 720:620. A animação continua
sendo composta pelo navegador; a taxa efetiva depende da tela e do dispositivo.
O vídeo separado tem resolução e cadência fixas: 3.840 × 2.160, 60 fps,
480 quadros, 8 segundos, H.264. Ele não é carregado pela página inicial.

## Reprodução

Requisitos: C++17 com OpenMP, Python 3, NumPy, SciPy, Pillow, FFmpeg com libx264
e Node.js para a verificação. Execute a partir da raiz do repositório:

```sh
g++ -O3 -std=c++17 -fopenmp scripts/render-mobius.cpp -o /tmp/render-mobius
node scripts/verify-mobius.mjs /tmp/render-mobius
/tmp/render-mobius /tmp/mobius-master.rgba 5760
python scripts/finish-mobius.py /tmp/mobius-master.rgba --width 5760 --assets --output /tmp/mobius-master.png
python scripts/export-mobius-video.py /tmp/mobius-master.png
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,nb_frames,duration assets/mobius-studio-4k60.mp4
```

O vídeo ajusta uniformemente a área original 720 × 620 à altura do quadro 16:9,
com espaço neutro nas laterais. Os deslocamentos são escalados junto com essa
área. Cada intervalo de quatro segundos avalia a Bézier original
`cubic-bezier(.42,0,.58,1)`; não há interpolação de movimento gerada por IA,
quadros duplicados para aumentar o fps, novos keyframes ou motion blur.

`verify-mobius.mjs` compara 153 posições e projeções com o gerador original,
confere os keyframes e verifica uma única componente de borda e característica
de Euler zero na malha com a identificação da emenda.
