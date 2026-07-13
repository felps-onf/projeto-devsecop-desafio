# Desafio DevSecOps — Gerenciador de Tarefas

## Sobre o Projeto
Este repositório faz parte do desafio prático do módulo de DevSecOps da ADA Tech.
O objetivo é implementar uma pipeline de segurança completa no GitHub Actions,
identificar e corrigir vulnerabilidades deliberadas no projeto, e fazer o deploy
para GitHub Pages.

## Alterações realizadas
- Implementada a pipeline em `.github/workflows/pipeline.yml`
- Corrigidos problemas de segurança no frontend
- Atualizadas dependências vulneráveis em `package.json`
- Documentado o processo completo neste README

## Vulnerabilidades corrigidas
- Remoção de segredos hardcoded de `src/script.js`
- Substituição de `eval(...)` por `console.log(...)` seguro
- Uso de `textContent` para evitar injeção de HTML
- Atualização de dependências antigas para versões mais seguras

## O que a pipeline verifica
A pipeline agora inclui os seguintes passos de segurança:

- **Secrets Scanning com Gitleaks**
  - Verifica o repositório em busca de chaves, tokens e credenciais armazenados em texto.
  - Se um segredo for encontrado, o job falha.

- **SAST com Semgrep**
  - Executa análise estática no diretório `src/`.
  - Usa a configuração automática `auto` e habilita `--error` para que qualquer problema gere falha.

- **SCA com Grype**
  - Analisa o conteúdo do projeto (`dir:.`) em busca de vulnerabilidades conhecidas em dependências.
  - O parâmetro `--fail-on medium` garante que vulnerabilidades de severidade média ou maior interrompam a pipeline.

- **Deploy em GitHub Pages**
  - Publica o conteúdo estático da pasta `src` como site.
  - O deploy só ocorre se todas as verificações de segurança passarem.

## Como a pipeline está configurada
O arquivo `.github/workflows/pipeline.yml` contém os seguintes blocos:

1. `on:`
   - `push` para a branch `main`
   - `workflow_dispatch` para execução manual

2. `permissions:`
   - `contents: read`
   - `pages: write`
   - `id-token: write`

3. `jobs.pipeline.steps:`
   - `actions/checkout@v4`
   - build básico com `ls src/`
   - `gitleaks/gitleaks-action@v2`
   - instalação e execução do `semgrep`
   - instalação e execução do `grype`
   - `actions/upload-pages-artifact@v3`
   - `actions/deploy-pages@v4`

## Como executar a pipeline
### Pelo GitHub
- Vá em `Actions` no repositório
- Selecione `Pipeline DevSecOps`
- Clique em `Run workflow`

### Pelo push
- Execute:
  ```bash
  git add .
  git commit -m "Implementa pipeline de segurança"
  git push origin main
  ```

## Requisitos de configuração adicional
### GitHub Pages
Para que o deploy funcione corretamente, certifique-se que o GitHub Pages está habilitado no repositório:
- Acesse `Settings > Pages`
- Configure o build com `GitHub Actions`
- Verifique se a branch `main` está permitida para Pages

### Token e permissões
- O workflow usa o `GITHUB_TOKEN` embutido pelo GitHub Actions
- `pages: write` já está configurado para permitir o deploy

## Resultados esperados
- Se o repositório contiver segredos, o passo Gitleaks falha
- Se o código contiver problemas de segurança, o Semgrep falha
- Se houver vulnerabilidades médias ou maiores nas dependências, o Grype falha
- Se todas as verificações passarem, o deploy publica o site em GitHub Pages

## URL de Produção
Após um deploy bem-sucedido, a URL de produção previsível é:

`https://felps-onf.github.io/projeto-devsecop-desafio/`

> Se você usa outro usuário ou organização, substitua `felps-onf` pelo seu namespace GitHub.
