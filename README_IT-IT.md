<div align="center">
  <img src="src/assets/logo-cover.png" width=256></img>
  <p><strong>Chatta contemporaneamente con TUTTI gli IA Bots, scopri il migliore</strong></p>

[Deutsch](README_DE-DE.md) | [English](README.md) | [Español](README_ES-ES.md) | [Français](README_FR-FR.md) | Italian | [日本語](README_JA-JP.md) | [한국어](README_KO-KR.md) | [Русский](README_RU-RU.md) | [Tiếng Việt](README_VI-VN.md) | [简体中文](README_ZH-CN.md)

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/ai-shifu/ChatALL)

</div>

## Screenshots

![Screenshot](screenshots/screenshot-1.png?raw=true)

## Caratteristiche

I Bot IA basati su Large Language Models (LLMs) sono sorprendenti. Tuttavia, il loro comportamento può essere casuale e diversi bot eccellono in diverse attività. Se desideri la migliore esperienza, non provarli uno per uno. ChatALL (nome cinese: 齐叨) può inviare prompt a diversi IA Bot contemporaneamente, aiutandoti a scoprire i migliori risultati. Tutto ciò che devi fare è [scaricare, installare](https://github.com/ai-shifu/ChatALL/releases) e chiedere .

### Sei uno di questi?

Gli utenti tipici di ChatALL sono:

- 🤠**Guru dei LLM**, che vogliono trovare le migliori risposte o creazioni dai LLM.
- 🤓**Ricercatori dei LLM**, che vogliono confrontare intuitivamente i punti di forza e di debolezza di vari LLM in diversi campi.
- 😎**Sviluppatori di applicazioni dei LLM**, che vogliono debuggare rapidamente i prompt e trovare i modelli di base più performanti.

### Bot supportati

| IA Bots                                                                        | Accesso Web   | API           | Note                                                   |
| ------------------------------------------------------------------------------ | ------------- | ------------- | ------------------------------------------------------ |
| [360 AI Brain](https://ai.360.cn/)                                             | Sì            | No            |                                                        |
| [Baidu ERNIE](https://yiyan.baidu.com/)                                        | No            | Sì            |                                                        |
| [Character.AI](https://character.ai/)                                          | Sì            | No            |                                                        |
| [ChatGLM2 6B & 130B](https://chatglm.cn/)                                      | Sì            | No            | Nessun accesso richiesto                               |
| [ChatGPT](https://chatgpt.com)                                             | Sì            | Sì            | Navigazione Web, include servizi Azure OpenAI          |
| [Claude](https://www.anthropic.com/claude)                                     | Sì            | Sì            |                                                        |
| [Code Llama](https://ai.meta.com/blog/code-llama-large-language-model-coding/) | Sì            | No            |                                                        |
| [Cohere Aya 23](https://cohere.com/blog/aya23)                                 | No            | Sì            |                                                        |
| [Modelli Cohere Command R](https://cohere.com/command)                         | No            | Sì            |                                                        |
| [Copilot](https://copilot.microsoft.com/)                                      | Sì            | No            |                                                        |
| [Dedao Learning Assistant](https://ai.dedao.cn/)                               | Prossimamente | No            |                                                        |
| [Falcon 180B](https://huggingface.co/tiiuae/falcon-180B-chat)                  | Sì            | No            |                                                        |
| [Gemini](https://gemini.google.com/)                                           | Sì            | Sì            |                                                        |
| [Gemma 2B & 7B](https://blog.google/technology/developers/gemma-open-models/)  | Sì            | No            |                                                        |
| [Gradio](https://gradio.app/)                                                  | Sì            | No            | Per modelli Hugging Face/spazio auto-deploy            |
| [Groq Cloud](https://console.groq.com/docs/models)                             | No            | Sì            |                                                        |
| [HuggingChat](https://huggingface.co/chat/)                                    | Sì            | No            |                                                        |
| [iFLYTEK SPARK](http://xinghuo.xfyun.cn/)                                      | Sì            | Prossimamente |                                                        |
| [Kimi](https://kimi.moonshot.cn/)                                              | Sì            | No            |                                                        |
| [Llama 2 13B & 70B](https://ai.meta.com/llama/)                                | Sì            | No            |                                                        |
| [MOSS](https://moss.fastnlp.top/)                                              | Sì            | No            |                                                        |
| [Perplexity](https://www.perplexity.ai/)                                       | Sì            | No            |                                                        |
| [Phind](https://www.phind.com/)                                                | Sì            | No            |                                                        |
| [Pi](https://pi.ai)                                                            | Sì            | No            |                                                        |
| [Poe](https://poe.com/)                                                        | Sì            | Prossimamente |                                                        |
| [SkyWork](https://neice.tiangong.cn/)                                          | Sì            | Prossimamente |                                                        |
| [Tongyi Qianwen](http://tongyi.aliyun.com/)                                    | Sì            | Prossimamente |                                                        |
| [Vicuna 13B & 33B](https://lmsys.org/blog/2023-03-30-vicuna/)                  | Sì            | No            | Nessun accesso richiesto                               |
| [WizardLM 70B](https://github.com/nlpxucan/WizardLM)                           | Sì            | No            |                                                        |
| [xAI Grok](https://x.ai)                                                       | No            | Sì            |                                                        |
| [YouChat](https://you.com/)                                                    | Sì            | No            |                                                        |
| [You](https://you.com/)                                                        | Sì            | No            |                                                        |
| [Zephyr](https://huggingface.co/spaces/HuggingFaceH4/zephyr-chat)              | Sì            | No            |                                                        |

Altri sono in arrivo. Vota i tuoi bot preferiti in [questi problemi](https://github.com/ai-shifu/ChatALL/labels/more%20LLMs).

### Nota sull'affidabilità dei bot AI basati sul Web

I bot AI basati sul Web (contrassegnati con "Web Access") sono intrinsecamente meno affidabili e spesso incontrano problemi di stabilità, poiché i fornitori di servizi aggiornano regolarmente le loro interfacce web e misure di sicurezza. Queste connessioni basate sul web si basano sul reverse engineering e sono difficili da mantenere, spesso smettendo di funzionare inaspettatamente. Per un'esperienza più affidabile, raccomandiamo vivamente di utilizzare bot che offrono accesso API quando possibile.

### Altre funzionalità

- Modalità prompt rapido: invia il prompt successivo senza attendere il completamento della richiesta precedente.
- Salva la cronologia delle chat localmente, proteggendo la tua privacy.
- Evidenzia la risposta che ti piace, elimina quelle indesiderate.
- Abilita/disabilita i bot in qualsiasi momento.
- Passa tra la vista a una, due o tre colonne.
- Aggiornamento automatico all'ultima versione.
- Modalità scura (contribuita da @tanchekwei).
- Scorciatoie da tastiera. Premi <kbd>Ctrl</kbd> + <kbd>/</kbd> per conoscerle tutte (contribuite da @tanchekwei).
- Chat multiple (contribuite da @tanchekwei).
- Impostazione proxy (contribuito da @msaong).
- Gestione dei prompt (contribuito da @tanchekwei).
- Supporto per diverse lingue (cinese, inglese, tedesco, francese, russo, vietnamita, coreano, giapponese, spagnolo, italiano).
- Supporto per Windows, macOS e Linux.

Funzionalità pianificate:

Siete benvenuti a contribuire a queste funzionalità.

- [ ] Deploy del front-end su Pagine GitHub

## Privacy

Tutta la cronologia delle chat, le impostazioni e i dati di accesso vengono salvati localmente sul tuo computer.

ChatALL raccoglie dati anonimi sull'utilizzo per aiutarci a migliorare il prodotto. Inclusi:

- Quali bot AI vengono sollecitati e quanto è lungo il prompt. Non include il contenuto del prompt.
- Quanto è lunga la risposta e quale risposta viene eliminata/evidenziata. Non include il contenuto della risposta.

## Prerequisiti

ChatALL è un client, non un proxy. Pertanto, devi:

1. Avere account funzionanti e/o token API per i bot.
2. Avere connessioni di rete affidabili ai bot.

## Download / Installazione

Scarica da https://github.com/ai-shifu/ChatALL/releases

### Su Windows

Basta scaricare il file \*-win.exe e procedere con l'installazione.

### Su macOS

Per Mac con processori Apple Silicon (M1, M2), scarica il file \*-mac-arm64.dmg.

Per gli altri Mac, scarica il file \*-mac-x64.dmg.

Se stai usando [Homebrew](https://brew.sh/), puoi installarlo anche con:

```bash
brew install --cask chatall
```

### Su Linux

Distribuzioni basate su Debian: Scarica il file .deb, fai doppio clic su di esso e installa il software.
Distribuzioni basate su Arch: Puoi clonare ChatALL da AUR [qui](https://aur.archlinux.org/packages/chatall-bin). Puoi installarlo manualmente o utilizzando un helper AUR come yay o paru.
Altre distribuzioni: Scarica il file .AppImage, rendilo eseguibile e goditi l'esperienza del clic. Puoi anche utilizzare [AppimageLauncher](https://github.com/TheAssassin/AppImageLauncher).

## Risoluzione dei problemi

Se incontri problemi durante l'utilizzo di ChatALL, puoi provare i seguenti metodi per risolverli:

1. **Ricarica** - premi <kbd>Ctrl</kbd> + <kbd>R</kbd> o <kbd>⌘</kbd> + <kbd>R</kbd>.
2. **Riavvia** - esci da ChatALL e avvialo nuovamente.
3. **Rilogin** - clicca sul pulsante delle impostazioni nell'angolo in alto a destra, quindi clicca sul link di accesso/uscita corrispondente per accedere nuovamente al sito web.
4. **Crea una nuova chat** - clicca sul pulsante `Nuova Chat` e invia nuovamente il prompt.

Se nessuno dei metodi sopra elencati funziona, puoi provare a **reimpostare ChatALL**. Nota che ciò cancellerà tutte le tue impostazioni e la cronologia dei messaggi.

Puoi reimpostare ChatALL eliminando le seguenti directory:

- Windows: `C:\Users\<user>\AppData\Roaming\chatall\`
- Linux: `/home/<user>/.config/chatall/`
- macOS: `/Users/<user>/Library/Application Support/chatall/`

Se il problema persiste, per favore [segnala il problema](https://github.com/ai-shifu/ChatALL/issues).

## Per gli sviluppatori

### Contribuisci con un Bot

[Guida](https://github.com/ai-shifu/ChatALL/blob/main/doc/developing_bot.md) potrebbe esserti utile.

### Esegui

```bash
npm install
npm run electron:serve
```

### Compila

Compila per la tua piattaforma corrente:

```bash
npm run electron:build
```

Compila per tutte le piattaforme:

```bash
npm run electron:build -- -wml --x64 --arm64
```

## Crediti

### Collaboratori

<a href="https://github.com/ai-shifu/ChatALL/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ai-shifu/ChatALL" />
</a>

### Altri

- GPT-4 ha contribuito gran parte del codice.
- ChatGPT, Copilot e Google hanno fornito molte soluzioni (elencati in ordine).
- Progetto ispirato da [ChatHub](https://github.com/chathub-dev/chathub). Rispetto!

## Sponsor

Se ti piace questo progetto, per favore considera:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F8KZJGJ)
