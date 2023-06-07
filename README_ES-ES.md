<div align="center">
  <img src="src/assets/logo-cover.png" width=256></img>
  <p><strong>Chat with ALL AI Bots Concurrently, Discover the Best</strong></p>

[Deutsch](README_DE-DE.md) | [English](README.md) | Español | [Français](README_FR-FR.md) | [日本語](README_JA-JP.md) | [한국인](README_KO-KR.md) | [Tiếng Việt](README_VI-VN.md) | [简体中文](README_ZH-CN.md)

</div>

## Capturas de pantalla

![Screenshot](screenshots/screenshot-2.png?raw=true)
![Screenshot](screenshots/screenshot-1.png?raw=true)

## Funciones

Los bots de IA basados en modelos de lenguaje grande (LLM) son increíbles. Sin embargo, su comportamiento puede ser aleatorio y diferentes bots sobresalen en diferentes tareas. Si quieres la mejor experiencia, no los pruebes uno por uno. ChatALL (nombre chino: 齐叨) puede enviar mensajes a varios bots de IA al mismo tiempo, ayudarlo a descubrir los mejores resultados. Todo lo que necesitas hacer es [descargar, instalar](https://github.com/sunner/ChatALL/releases) y preguntar.

### Bots compatibles

| Bots de IA                                                   | Acceso Web   | API          | Notas                                                |
| ------------------------------------------------------------ | ------------ | ------------ | ---------------------------------------------------- |
| [ChatGPT](https://chat.openai.com)                           | Sí           | Sí           | Navegación web incluida                              |
| [Bing Chat](https://www.bing.com/new)                        | Sí           | Sin API      | No es necesario iniciar sesión                       |
| [Baidu ERNIE](https://yiyan.baidu.com/)                      | No           | Sí           |                                                      |
| [Bardo](https://bard.google.com/)                            | Sí           | Próximamente |                                                      |
| [Poe](https://poe.com/)                                      | Próximamente | Próximamente |                                                      |
| [MUSGO](https://moss.fastnlp.top/)                           | Sí           | Sin API      |                                                      |
| [Tongyi Qianwen](http://tongyi.aliyun.com/)                  | Sí           | Próximamente |                                                      |
| [Asistente de aprendizaje de Dedao](https://ai.dedao.cn/)    | Próximamente | Sin API      |                                                      |
| [iFLYTEK SPARK](http://xinghuo.xfyun.cn/)                    | Sí           | Próximamente |                                                      |
| [Alpaca](https://crfm.stanford.edu/2023/03/13/alpaca.html)   | Sí           | Sin API      | No es necesario iniciar sesión                       |
| [Vicuña](https://lmsys.org/blog/2023-03-30-vicuna/)          | Sí           | Sin API      | No es necesario iniciar sesión                       |
| [ChatGLM](https://chatglm.cn/blog)                           | Sí           | Sin API      | No es necesario iniciar sesión                       |
| [Claude](https://www.anthropic.com/index/introducing-claude) | Sí           | Sin API      | No es necesario iniciar sesión                       |
| [Gradio](https://gradio.app/)                                | Sí           | Sin API      | Para modelos de espacio Hugging Face/autodesplegados |
| [HuggingChat](https://huggingface.co/chat/)                  | Sí           | Sin API      |                                                      |

Más está por venir. Vota a tus bots favoritos en [Estas cuestiones](https://github.com/sunner/ChatALL/labels/more%20LLMs).

### Otras características

- Modo de solicitud rápida: envíe la siguiente solicitud sin esperar a que se complete la solicitud anterior
- Almacene el historial de chat localmente, proteja su privacidad
- Resalta la respuesta que te gusta, elimina la mala
- Mantenga activa automáticamente la sesión de ChatGPT
- Habilite/deshabilite cualquier bot en cualquier momento
- Cambiar entre una vista de una, dos o tres columnas
- Soporta múltiples idiomas (chino, inglés, alemán, francés, ruso, vietnamita, coreano)
- Compatible con Windows, macOS y Linux

Características planificadas:

Le invitamos a contribuir a estas características.

- \[ ] Modo oscuro
- \[ ] Multi-chats
- \[ ] Seleccione bots en el menú emergente
- \[ ] Implementar front-end en GitHub Pages
- \[ ] Integración con LangChain

## Prerrequisitos

ChatALL es un cliente, no un proxy. Por lo tanto, usted debe:

1.  Tener cuentas de trabajo y/o tokens API para los bots.
2.  Tener conexiones de red confiables a los bots.
3.  Si está utilizando una VPN, debe configurarse como proxy del sistema / global.

## Descargar / Instalar

Descargar desde https://github.com/sunner/ChatALL/releases

### En Windows

Simplemente descargue el archivo \*-win.exe y continúe con la configuración.

### En macOS

Para Apple Silicon Mac (CPU M1, M2), descargue el archivo \*-mac-arm64.dmg.

Para otros Mac, descargue el archivo \*-mac-x64.dmg.

Si el sistema le indica que no puede comprobar si el software es malicioso, siga el botón [Guía oficial de Apple](https://support.apple.com/guide/mac-help/apple-cant-check-app-for-malicious-software-mchleab3a043/mac) para continuar.

### En Linux

Descargue el archivo . AppImage, hágalo ejecutable y disfrute de la experiencia de hacer clic y ejecutar.

## Para desarrolladores

### Contribuir con un bot

[La guía](https://github.com/sunner/ChatALL/wiki/%E5%A6%82%E4%BD%95%E6%B7%BB%E5%8A%A0%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84-AI-%E5%AF%B9%E8%AF%9D%E6%9C%BA%E5%99%A8%E4%BA%BA) puede ayudarle.

### Dependientes del medio ambiente

Nodo.js debe ser v16.x

### Correr

```bash
npm install
npm run electron:serve
```

### Construir

Cree para su plataforma actual:

```bash
npm run electron:build
```

Compilar para todas las plataformas:

```bash
npm run electron:build -- -wml --x64 --arm64
```

## Créditos

### Colaboradores

<a href="https://github.com/sunner/ChatALL/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sunner/ChatALL" />
</a>

### Otros

- GPT-4 contribuyó con gran parte del código
- ChatGPT, Bing Chat y Google proporcionan muchas soluciones (clasificadas en orden)
- Inspirado por [ChatHub](https://github.com/chathub-dev/chathub). ¡Respeto!

## Patrocinador

Si te gusta este proyecto, por favor considera:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F8KZJGJ)
