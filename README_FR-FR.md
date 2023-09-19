<div align="center">
  <img src="src/assets/logo-cover.png" width=256></img>
  <p><strong>Discutez avec tous les bots IA simultanément pour sélectionner la meilleure réponse</strong></p>

[Deutsch](README_DE-DE.md) | [English](README.md) | [Español](README_ES-ES.md) | Français | [Italian](README_IT-IT.md) | [日本語](README_JA-JP.md) | [한국어](README_KO-KR.md) | [Русский](README_RU-RU.md) | [Tiếng Việt](README_VI-VN.md) | [简体中文](README_ZH-CN.md)

</div>

## Captures d'écran

![Screenshot](screenshots/screenshot-1.png?raw=true)

## Fonctionnalités

Les robots d'intelligence artificielle basés sur les grands modèles de langage (Large Language Models ou LLMs) sont incroyables. Cependant, leur comportement peut être aléatoire et différents robots excellent dans différentes tâches. Si vous voulez la meilleure expérience, ne les essayez pas un par un. ChatALL (nom chinois : 齐叨) peut envoyer des invites à plusieurs robots IA simultanément afin de vous permettre de sélectionner la réponse qui vous semblera la plus pertinante.

### Bots pris en charge

| AI Bots                                                      | Accès web     | API           | Notes                                             |
| ------------------------------------------------------------ | ------------- | ------------- | ------------------------------------------------- |
| [ChatGPT](https://chat.openai.com)                           | Oui           | Oui           | Navigation web incluse                            |
| [Bing Chat](https://www.bing.com/new)                        | Oui           | Non           |                                                   |
| [Baidu ERNIE](https://yiyan.baidu.com/)                      | Non           | Oui           |                                                   |
| [Bard](https://bard.google.com/)                             | Oui           | Non           |                                                   |
| [Poe](https://poe.com/)                                      | Oui           | Prochainement |                                                   |
| [MOSS](https://moss.fastnlp.top/)                            | Oui           | Non           |                                                   |
| [Tongyi Qianwen](http://tongyi.aliyun.com/)                  | Oui           | Prochainement |                                                   |
| [Dedao Learning Assistant](https://ai.dedao.cn/)             | Prochainement | Non           |                                                   |
| [iFLYTEK SPARK](http://xinghuo.xfyun.cn/)                    | Oui           | Prochainement |                                                   |
| [Alpaca](https://crfm.stanford.edu/2023/03/13/alpaca.html)   | Oui           | Non           | Pas besoin de compte ou de clé API                |
| [Vicuna](https://lmsys.org/blog/2023-03-30-vicuna/)          | Oui           | Non           | Pas besoin de compte ou de clé API                |
| [ChatGLM](https://chatglm.cn/blog)                           | Oui           | Non           | Pas besoin de compte ou de clé API                |
| [Claude](https://www.anthropic.com/index/introducing-claude) | Oui           | Non           | Pas besoin de compte ou de clé API                |
| [Gradio](https://gradio.app/)                                | Oui           | Non           | Pour les modèles Hugging Face space/self-deployed |
| [HuggingChat](https://huggingface.co/chat/)                  | Oui           | Non           |                                                   |
| [QianWen](https://qianwen.aliyun.com/)                       | Oui           | Prochainement |                                                   |

Et plus...

### Autres fonctionalités

- Mode d'invite rapide : envoyez l'invite suivante sans attendre la fin de la demande précédente.
- Stockage local de l'historique du chat, pour protéger votre vie privée
- Mettez en évidence les réponses que vous aimez, supprimez les mauvaises
- Maintien automatique de la session ChatGPT en vie
- Activer/désactiver les bots à tout moment
- Choix de l'affichage en une, deux ou trois colonnes
- Supporte plusieurs langues (en, zh)
- [TODO] Meilleures recommandations

## Prérequis

ChatALL est un client, pas un proxy. Par conséquent, vous devez :

1. Avoir des comptes et/ou des jetons API fonctionnels pour les bots.
2. Avoir des connexions réseau fiables avec les bots.
3. Si vous utilisez un VPN, il doit être configuré comme proxy système/global.

## Télécharger / Installer

Télécharger depuis https://github.com/sunner/ChatALL/releases

### Sur Windows

Just download the \*-win.exe file and proceed with the setup.

### Sur macOS

Pour les Macs de type Apple Silicon (M1, M2 CPU), téléchargez le fichier \*-mac-arm64.dmg.

Pour les autres Macs (Intel), téléchargez le fichier \*-mac-x64.dmg.

### Sur Linux

Téléchargez le fichier .AppImage, rendez-le exécutable et profitez de l'expérience du "click-to-run".

## Pour les développeurs

### Contribuer à un bot

[Le guide](https://github.com/sunner/ChatALL/wiki/%E5%A6%82%E4%BD%95%E6%B7%BB%E5%8A%A0%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84-AI-%E5%AF%B9%E8%AF%9D%E6%9C%BA%E5%99%A8%E4%BA%BA) may help you.

### Lancement

```bash
npm install
npm run electron:serve
```

### Build

Build pour votre plateforme actuelle:

```bash
npm run electron:build
```

Build pour toutes les plateformes:

```bash
npm run electron:build -- -wml --x64 --arm64
```

## Credits

### Contributeurs

<a href="https://github.com/sunner/ChatALL/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sunner/ChatALL" />
</a>

### Autres

- GPT-4 a contribué à une grande partie du code
- ChatGPT, Bing Chat et Google fournissent de nombreuses solutions (classées par ordre).
- Inspiré par [ChatHub] (https://github.com/chathub-dev/chathub). Respect !

## Sponsor

Si vous aimez ce projet, veuillez envisager:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F8KZJGJ)
