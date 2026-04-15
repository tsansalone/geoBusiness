# Status da implementação

## Fundação do projeto

Concluído:

- inicialização do repositório Git
- `.editorconfig`, `.gitignore` e `.env.exemplo`
- README principal em PT-BR
- documentação-base da arquitetura, modelo de dados e métricas

## Dados e pipeline

Concluído:

- estrutura padrão para snapshots do CNPJ
- organização do snapshot `2026-04`
- política de retenção local para manter apenas ZIP original e metadados leves
- nomenclatura de pastas simplificada para `original`, `extraido`, `processado` e `metadados`
- nomenclatura das camadas processadas padronizada para `recorte`, `preparado` e `analitico`
- notebooks ajustados para partir do ZIP original no Colab
- contrato inicial do layout CNPJ
- scripts de inspeção, manifesto e recorte

Em andamento:

- notebooks do Colab para inspeção e recorte
- integração entre artefatos processados e API
- cidade-alvo padrão ajustada para `Praia Grande - SP` com código de município `6921`

## Backend

Concluído:

- API FastAPI com rotas previstas no plano
- dados sintéticos para o POC
- testes básicos da API

## Frontend

Em andamento:

- aplicação Next.js em PT-BR
- mapa analítico com grade hexagonal sintética
- painéis de detalhe, comparação e qualidade
- build sintético validado com sucesso no ambiente local

Observação:

- a versão atual do `next` ainda precisa ser atualizada para uma versão corrigida de segurança

## Infra

Pendente de validação local:

- Docker/PostGIS
- instalação de dependências Python e Node
- execução integrada ponta a ponta
