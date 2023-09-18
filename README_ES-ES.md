<div align="center">
  <img src="src/assets/logo-cover.png" width=256></img>
  <p><strong>Chatea con TODOS los bots de IA al mismo tiempo, descubre lo mejor</strong></p>

[Alemán](README_DE-DE.md) | Español | [English](README_ES-ES.md) | [Français](README_FR-FR.md) | [Italiano](README_IT-IT.md) | [日本語](README_JA-JP.md) | [한국어](README_KO-KR.md) | [Русский](README_RU-RU.md) | [Tiếng Việt](README_VI-VN.md) | [简体中文](README_ZH-CN.md)

</div>

## Capturas de pantalla

![Captura de pantalla](screenshots/screenshot-1.png?raw=true)

## Funciones

Los bots de IA basados en modelos de lenguaje grande (LLM) son increíbles. Sin embargo, su comportamiento puede ser aleatorio y diferentes bots sobresalen en diferentes tareas. Si quieres la mejor experiencia, no los pruebes uno por uno. ChatALL (nombre chino: 齐叨) puede enviar mensajes a varios bots de IA al mismo tiempo, ayudarlo a descubrir los mejores resultados. Todo lo que necesita hacer es [descargar, instalar](https://github.com/sunner/ChatALL/releases) y preguntar.

### ¿Eres tú?

Los usuarios típicos de ChatALL son:

- **Gurús de LLMs**, que quieren encontrar las mejores respuestas o creaciones de LLMs.
- **Investigadores de LLM**, que desean comparar intuitivamente las fortalezas y debilidades de varios LLM en diferentes campos.
- **Desarrolladores de aplicaciones LLM**, que desean depurar rápidamente los mensajes y encontrar los modelos de base de mejor rendimiento.

### Bots compatibles

| Bots de IA                                                   | Acceso Web   | API          | Notas                                                |
| ------------------------------------------------------------ | ------------ | ------------ | ---------------------------------------------------- |
| [ChatGPT](https://chat.openai.com)                           | Sí           | Sí           | Exploración web, servicio Azure OpenAI incluido      |
| [Chat de Bing](https://www.bing.com/new)                     | Sí           | Sin API      | No se requiere inicio de sesión                      |
| [Baidu ERNIE](https://yiyan.baidu.com/)                      | No           | Sí           |                                                      |
| [Bardo](https://bard.google.com/)                            | Sí           | Próximamente |                                                      |
| [Poe](https://poe.com/)                                      | Sí           | Próximamente |                                                      |
| [MUSGO](https://moss.fastnlp.top/)                           | Sí           | Sin API      |                                                      |
| [Tongyi Qianwen](http://tongyi.aliyun.com/)                  | Sí           | Próximamente |                                                      |
| [Asistente de aprendizaje de Dedao](https://ai.dedao.cn/)    | Próximamente | Sin API      |                                                      |
| [iFLYTEK SPARK](http://xinghuo.xfyun.cn/)                    | Sí           | Próximamente |                                                      |
| [Alpaca](https://crfm.stanford.edu/2023/03/13/alpaca.html)   | Sí           | Sin API      | No se requiere inicio de sesión                      |
| [Vicuña](https://lmsys.org/blog/2023-03-30-vicuna/)          | Sí           | Sin API      | No se requiere inicio de sesión                      |
| [ChatGLM](https://chatglm.cn/blog)                           | Sí           | Sin API      | No se requiere inicio de sesión                      |
| [Claude](https://www.anthropic.com/index/introducing-claude) | Sí           | Sin API      | No se requiere inicio de sesión                      |
| [Gradio](https://gradio.app/)                                | Sí           | Sin API      | Para modelos de espacio Hugging Face/autodesplegados |
| [HuggingChat](https://huggingface.co/chat/)                  | Sí           | Sin API      | Llama 2 incluido                                     |
| [SkyWork](https://neice.tiangong.cn/)                        | Sí           | Próximamente |                                                      |
| [Tú](https://you.com/)                                       | Sí           | Sin API      |                                                      |
| [Pi](https://pi.ai)                                      | Sí           | Sin API      |                                                      |
| [Cerebro de IA 360](https://ai.360.cn/)                      | Sí           | Sin API      |                                                      |
| [YouChat](https://you.com/)                                  | Sí           | Sin API      |                                                      |
| [Asistente para abrir](https://open-assistant.io/)           | Sí           | Sin API      |                                                      |
| [Claude](https://claude.ai/)                                 | Sí           | Sin API      |                                                      |
| [Character.AI](https://character.ai/)                        | Sí           | Sin API      |                                                      |

Más está por venir. Vota a tus bots favoritos en [estos temas](https://github.com/sunner/ChatALL/labels/more%20LLMs).

### Otras características

- Modo de solicitud rápida: envíe la siguiente solicitud sin esperar a que se complete la solicitud anterior
- Guarde el historial de chat localmente, proteja su privacidad
- Resalta la respuesta que te gusta, elimina la mala
- Habilite/deshabilite cualquier bot en cualquier momento
- Cambiar entre una vista de una, dos o tres columnas
- Actualización automática a la última versión
- Modo oscuro (contribución de @tanchekwei)
- Teclas cortas. Pulsa `Ctrl + /` para conocerlos todos (contribución de @tanchekwei)
- Múltiples chats (contribución de @tanchekwei)
- Configuración de proxy (contribución de @msaong)
- Gestión rápida (contribución de @tanchekwei)
- Soporta múltiples idiomas (chino, inglés, alemán, francés, ruso, vietnamita, coreano, japonés, español, italiano)
- Compatible con Windows, macOS y Linux

Características planificadas:

Le invitamos a contribuir a estas características.

- [ ] Implementar front-end en páginas de GitHub

## Prerrequisitos

ChatALL es un cliente, no un proxy. Por lo tanto, usted debe:

1. Tener cuentas de trabajo y/o tokens API para los bots.
2. Tener conexiones de red confiables a los bots.
3. Si está utilizando una VPN, debe configurarse como proxy del sistema / global.

## Descargar / Instalar

Descargar desde https://github.com/sunner/ChatALL/releases

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

Descargue el archivo . AppImage, hágalo ejecutable y disfrute de la experiencia de hacer clic y ejecutar.

## Solución de problemas

Si encuentra algún problema al usar ChatALL, puede probar los siguientes métodos para resolverlo:

1. **Actualizar** : pulse `Ctrl + R` o `Cmd + R`.
2. **Reiniciar** : salga de ChatALL y ejecútelo de nuevo.
3. **Volver a iniciar sesión: haga clic en el botón de configuración en la ** esquina superior derecha, luego haga clic en el enlace de inicio / cierre de sesión correspondiente en la ventana emergente para iniciar sesión nuevamente en el sitio web.
4. **Borrar todos los mensajes** : haga clic en el botón de la escoba en la esquina superior derecha.

Si ninguno de los métodos anteriores funciona, puede intentar **restablecer ChatALL.** Tenga en cuenta que esto eliminará toda su configuración e historial de mensajes.

Puede restablecer ChatALL eliminando los siguientes directorios:

- Windows: `C:\Users\<user>\AppData\Roaming\ChatALL\`
- Linux: `/home/<user>/.config/ChatALL/`
- macOS: `/Users/<user>/Library/Application Support/ChatALL/`

Si el problema persiste, [envíe un problema](https://github.com/sunner/ChatALL/issues).

## Para desarrolladores

### Contribuir con un bot

[La guía](https://github.com/sunner/ChatALL/wiki/%E5%A6%82%E4%BD%95%E6%B7%BB%E5%8A%A0%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84-AI-%E5%AF%B9%E8%AF%9D%E6%9C%BA%E5%99%A8%E4%BA%BA) puede ayudarle.

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
- Inspirado en [ChatHub](https://github.com/chathub-dev/chathub). ¡Respeto!

## Patrocinador

Si te gusta este proyecto, por favor considera:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F8KZJGJ)
