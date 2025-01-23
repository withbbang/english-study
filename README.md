# English Study

[Homepage](https://english-study.o-r.kr/)

### 프로젝트 목적

- 영어 공부를 위한 개인 프로젝트

---

### 카테고리 설명

- Diary: 영어 일기장
- Making-use-of: 응용 정리
- Spoken-Language: 구어 정리
- Vocabulary: 단어 정리
- Hard-To-Speak-Phrase: 소리내서 말하기 어려운 구문

---

### 프로젝트 구조

```
English Study
├─ 📁config
│  ├─ 📁jest
│  │  ├─ 📄babelTransform.js
│  │  ├─ 📄cssTransform.js
│  │  └─ 📄fileTransform.js
│  ├─ 📁components
│  │  └─ 📁persistentCache
│  │     └─ 📁persistentCache
│  │        └─ 📄createEnvironmentHash.js
│  ├─ 📄env.js
│  ├─ 📄getHttpsConfig.js
│  ├─ 📄modules.js
│  ├─ 📄paths.js
│  ├─ 📄webpack.config.js
│  └─ 📄webpackDevServer.config.js
├─ 📁public
│  ├─ 📄index.css
│  ├─ 📄index.html
│  ├─ 📄logo.svg
│  ├─ 📄manifest.json
│  └─ 📄robots.txt
├─ 📁scripts
│  ├─ 📄build.js
│  ├─ 📄start.js
│  └─ 📄test.js
├─ 📁src
│  ├─ 📁components
│  ├─ 📁middlewares
│  ├─ 📁modules
│  ├─ 📁screens
│  ├─ 📁scss
│  ├─ 📄App.tsx
│  ├─ 📄global.d.ts
│  └─ 📄index.tsx
├─ 📄.eslintrc.json
├─ 📄.gitignore
├─ 📄.gitmessage.txt
├─ 📄.prettierrc
├─ 📄package-lock.json
├─ 📄package.json
├─ 📄README.md
├─ 📄Todo.txt
└─ 📄tsconfig.json
```

---

### 파일 설명

- 📁config: CRA의 기초 구성 파일을 담고 있는 폴더 (scss 설정을 위함)
- 📁scripts: CRA의 동작 명령어를 담고 있는 폴더
- 📄global.d.ts: 타입스크립트가 지원하지 않는 타입을 추가하는 프로젝트 한정 글로벌 파일
- 📄.eslintrc.json: eslint 설정 파일
- 📄.gitmessage.txt: git commit template 파일
- 📄.prettierrc: 프리티어 설정 파일
- 📄Todo.txt: 현재 프로젝트의 Todo List
