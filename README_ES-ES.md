<div align="center">
  <img src="src/assets/logo-cover.png" width=256></img>
  <p><strong>Chatea con TODOS los bots de IA al mismo tiempo, descubre lo mejor</strong></p>

[Deutsch](README_DE-DE.md) | [English](README.md) | Español | [Français](README_FR-FR.md) | [Italiano](README_IT-IT.md) | [日本語](README_JA-JP.md) | [한국어](README_KO-KR.md) | [Русский](README_RU-RU.md) | [Tiếng Việt](README_VI-VN.md) | [简体中文](README_ZH-CN.md)

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/ai-shifu/ChatALL)

</div>

## Capturas de pantalla

![Captura de pantalla](screenshots/screenshot-1.png?raw=true)

## Funciones

Los bots de IA basados en modelos de lenguaje grande (LLM) son increíbles. Sin embargo, su comportamiento puede ser aleatorio y diferentes bots sobresalen en diferentes tareas. Si quieres la mejor experiencia, no los pruebes uno por uno. ChatALL (nombre chino: 齐叨) puede enviar mensajes a varios bots de IA al mismo tiempo, ayudarlo a descubrir los mejores resultados. Todo lo que necesita hacer es [descargar, instalar](https://github.com/ai-shifu/ChatALL/releases) y preguntar.

### ¿Eres tú?

Los usuarios típicos de ChatALL son:

- 🤠**Gurús de LLMs**, que quieren encontrar las mejores respuestas o creaciones de LLMs.
- 🤓**Investigadores de LLM**, que desean comparar intuitivamente las fortalezas y debilidades de varios LLM en diferentes campos.
- 😎**Desarrolladores de aplicaciones LLM**, que desean depurar rápidamente los mensajes y encontrar los modelos de base de mejor rendimiento.

### Bots compatibles

| IA Bots                                                                        | Acceso Web    | API           | Notas                                                  |
| ------------------------------------------------------------------------------ | ------------- | ------------- | ------------------------------------------------------ |
| [360 AI Brain](https://ai.360.cn/)                                             | Sí            | No            |                                                        |
| [Baidu ERNIE](https://yiyan.baidu.com/)                                        | No            | Sí            |                                                        |
| [Character.AI](https://character.ai/)                                          | Sí            | No            |                                                        |
| [ChatGLM2 6B & 130B](https://chatglm.cn/)                                      | Sí            | No            | No requiere inicio de sesión                           |
| [ChatGPT](https://chatgpt.com)                                             | Sí            | Sí            | Navegación Web, incluye servicio Azure OpenAI          |
| [Claude](https://www.anthropic.com/claude)                                     | Sí            | Sí            |                                                        |
| [Code Llama](https://ai.meta.com/blog/code-llama-large-language-model-coding/) | Sí            | No            |                                                        |
| [Cohere Aya 23](https://cohere.com/blog/aya23)                                 | No            | Sí            |                                                        |
| [Modelos Cohere Command R](https://cohere.com/command)                         | No            | Sí            |                                                        |
| [Copilot](https://copilot.microsoft.com/)                                      | Sí            | No            |                                                        |
| [Dedao Learning Assistant](https://ai.dedao.cn/)                               | Próximamente  | No            |                                                        |
| [Falcon 180B](https://huggingface.co/tiiuae/falcon-180B-chat)                  | Sí            | No            |                                                        |
| [Gemini](https://gemini.google.com/)                                           | Sí            | Sí            |                                                        |
| [Gemma 2B & 7B](https://blog.google/technology/developers/gemma-open-models/)  | Sí            | No            |                                                        |
| [Gradio](https://gradio.app/)                                                  | Sí            | No            | Para modelos Hugging Face/spacio auto-deploy           |
| [Groq Cloud](https://console.groq.com/docs/models)                             | No            | Sí            |                                                        |
| [HuggingChat](https://huggingface.co/chat/)                                    | Sí            | No            |                                                        |
| [iFLYTEK SPARK](http://xinghuo.xfyun.cn/)                                      | Sí            | Próximamente  |                                                        |
| [Kimi](https://kimi.moonshot.cn/)                                              | Sí            | No            |                                                        |
| [Llama 2 13B & 70B](https://ai.meta.com/llama/)                                | Sí            | No            |                                                        |
| [MOSS](https://moss.fastnlp.top/)                                              | Sí            | No            |                                                        |
| [Perplexity](https://www.perplexity.ai/)                                       | Sí            | No            |                                                        |
| [Phind](https://www.phind.com/)                                                | Sí            | No            |                                                        |
| [Pi](https://pi.ai)                                                            | Sí            | No            |                                                        |
| [Poe](https://poe.com/)                                                        | Sí            | Próximamente  |                                                        |
| [SkyWork](https://neice.tiangong.cn/)                                          | Sí            | Próximamente  |                                                        |
| [Tongyi Qianwen](http://tongyi.aliyun.com/)                                    | Sí            | Próximamente  |                                                        |
| [Vicuna 13B & 33B](https://lmsys.org/blog/2023-03-30-vicuna/)                  | Sí            | No            | No requiere inicio de sesión                           |
| [WizardLM 70B](https://github.com/nlpxucan/WizardLM)                           | Sí            | No            |                                                        |
| [xAI Grok](https://x.ai)                                                       | No            | Sí            |                                                        |
| [YouChat](https://you.com/)                                                    | Sí            | No            |                                                        |
| [You](https://you.com/)                                                        | Sí            | No            |                                                        |
| [Zephyr](https://huggingface.co/spaces/HuggingFaceH4/zephyr-chat)              | Sí            | No            |                                                        |

Más está por venir. Vota a tus bots favoritos en [estos temas](https://github.com/ai-shifu/ChatALL/labels/more%20LLMs).

### Nota sobre la fiabilidad de los bots de IA basados en Web

Los bots de IA basados en Web (marcados como "Acceso Web") son inherentemente menos fiables y frecuentemente enfrentan problemas de estabilidad. Esto se debe a que los proveedores de servicios actualizan regularmente sus interfaces web y medidas de seguridad, lo que requiere un mantenimiento constante mediante ingeniería inversa. Este tipo de conexión es difícil de mantener y puede dejar de funcionar inesperadamente. Para una experiencia más confiable, recomendamos encarecidamente utilizar bots que ofrezcan acceso API cuando sea posible.

### Otras características

- Modo de solicitud rápida: envíe la siguiente solicitud sin esperar a que se complete la solicitud anterior
- Guarde el historial de chat localmente, proteja su privacidad
- Resalta la respuesta que te gusta, elimina la mala
- Habilite/deshabilite cualquier bot en cualquier momento
- Cambiar entre una vista de una, dos o tres columnas
- Actualización automática a la última versión
- Modo oscuro (contribución de @tanchekwei)
- Teclas cortas. Pulsa <kbd>Ctrl</kbd> + <kbd>/</kbd> para conocerlos todos (contribución de @tanchekwei)
- Múltiples chats (contribución de @tanchekwei)
- Configuración de proxy (contribución de @msaong)
- Gestión de mensajes (contribución de @tanchekwei)
- Soporta múltiples idiomas (chino, inglés, alemán, francés, ruso, vietnamita, coreano, japonés, español, italiano)
- Compatible con Windows, macOS y Linux

Características planificadas:

Le invitamos a contribuir a estas características.

- [ ] Implementar front-end en páginas de GitHub

## Privacidad

Todo el historial de chat, la configuración y los datos de inicio de sesión se guardan localmente en su computadora.

ChatALL recopila datos de uso anónimos para ayudarnos a mejorar el producto. Incluyendo:

- Qué bots de IA se solicitan y cuánto tiempo dura la solicitud. No se incluye el contenido de la solicitud.
- Cuánto tiempo dura la respuesta y qué respuesta se elimina/resalta. No se incluye el contenido de la respuesta.

## Prerrequisitos

ChatALL es un cliente, no un proxy. Por lo tanto, usted debe:

1. Tener cuentas de trabajo y/o tokens API para los bots.
2. Tener conexiones de red confiables a los bots.

## Descargar / Instalar

Descargar desde https://github.com/ai-shifu/ChatALL/releases

### En Windows

Simplemente descargue el archivo \*-win.exe y continúe con la configuración.

### En macOS

Para Apple Silicon Mac (CPU M1, M2), descargue el archivo \*-mac-arm64.dmg.

Para otros Mac, descargue el archivo \*-mac-x64.dmg.

Si está utilizando [Homebrew](https://brew.sh/), también puede instalarlo con:

```bash
brew install --cask chatall
```

### En Linux

Distribuciones basadas en Debian: descargue el archivo .deb, haga doble clic en él e instale el software.
Distribuciones basadas en Arch: puede clonar ChatALL desde el AUR [aquí](https://aur.archlinux.org/packages/chatall-bin). Puede instalarlo manualmente o utilizando un ayudante de AUR como yay o paru.
Otras distribuciones: descargue el archivo .AppImage, hágalo ejecutable y disfrute de la experiencia de hacer clic y ejecutar. También puede usar [AppimageLauncher](https://github.com/TheAssassin/AppImageLauncher).

## Solución de problemas

Si encuentra algún problema al usar ChatALL, puede probar los siguientes métodos para resolverlo:

1. **Actualizar** : pulse <kbd>Ctrl</kbd> + <kbd>R</kbd> o <kbd>⌘</kbd> + <kbd>R</kbd>.
2. **Reiniciar** : salga de ChatALL y ejecútelo de nuevo.
3. **Volver a iniciar sesión** - haga clic en el botón de configuración en la esquina superior derecha, luego haga clic en el enlace de inicio/cierre de sesión correspondiente para volver a iniciar sesión en el sitio web.
4. **Crear un nuevo chat** - haga clic en el botón `Nuevo Chat` y envíe la solicitud nuevamente.

Si ninguno de los métodos anteriores funciona, puede intentar **restablecer ChatALL.** Tenga en cuenta que esto eliminará toda su configuración e historial de mensajes.

Puede restablecer ChatALL eliminando los siguientes directorios:

- Windows: `C:\Users\<user>\AppData\Roaming\chatall\`
- Linux: `/home/<user>/.config/chatall/`
- macOS: `/Users/<user>/Library/Application Support/chatall/`

Si el problema persiste, [envíe un problema](https://github.com/ai-shifu/ChatALL/issues).

## Para desarrolladores

### Contribuir con un bot

[La guía](https://github.com/ai-shifu/ChatALL/wiki/%E5%A6%82%E4%BD%95%E6%B7%BB%E5%8A%A0%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84-AI-%E5%AF%B9%E8%AF%9D%E6%9C%BA%E5%99%A8%E4%BA%BA) puede ayudarle.

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

<a href="https://github.com/ai-shifu/ChatALL/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ai-shifu/ChatALL" />
</a>

### Otros

- GPT-4 contribuyó con gran parte del código
- ChatGPT, Copilot y Google proporcionan muchas soluciones (clasificadas en orden)
- Inspirado en [ChatHub](https://github.com/chathub-dev/chathub). ¡Respeto!

## Patrocinador

Si te gusta este proyecto, por favor considera:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F8KZJGJ)
