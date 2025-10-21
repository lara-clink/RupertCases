# RupertCases

Catálogo de cases para instrumentos.  
Site estático, mas requer servidor local para funcionar corretamente (fetch de JSON).

## Como rodar localmente

### Opção 1: VS Code Live Server 
1. Instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
2. Abra o projeto no VS Code.
3. Clique em "Go Live" no rodapé.
4. Acesse o site em `http://localhost:5500`.

### Opção 2: Node.js live-server
1. Instale o live-server globalmente:
   ```bash
   npm install -g live-server
   ```
2. Na pasta do projeto, rode:
   ```bash
   live-server
   ```

### Opção 3: Python HTTP Server
1. Se tiver Python 3 instalado:
   ```bash
   python3 -m http.server 8000
   ```
2. Acesse em `http://localhost:8000`.

### Opção 4: Node.js http-server
1. Instale:
   ```bash
   npm install -g http-server
   ```
2. Rode:
   ```bash
   http-server
   ```

---