
## **Passos para Rodar o Projeto**

1. **Preparar o Ambiente**
   - O aplicativo está com SDK do Expo na 51 ainda, pois há icompatibilidades de bibliotecas com o SDK 52 (Versao mais recente). Por conta disso, se optar por baixar o Expo Go,
     um erro será avisado ao ler o QRCode falando que o Expo Go ta na versao 52 e o aplicativo na 51. Mas no erro, um link para download do Expo Go 51 estará disponivel para download
     da versao correta. Se optar por usar o emulador ou com o cabo do celular conectado, isso não é necessário.
   - Instale o [Android Studio](https://developer.android.com/studio) ou utilize um emulador de Android.  
   - Como alternativa, baixe o aplicativo **Expo Go** em seu dispositivo móvel. [Clique aqui para acessar o Expo Go](https://expo.dev/client).

3. **Clonar o Repositório**
4. 
5. **Instalar as Dependências**  
   Execute o comando:  
   ```bash
   npm install
   ```

6. **Executar o Projeto**  
   Inicie o projeto com o comando:  
   ```bash
   npx expo start
   ```

   - Para dispositivos móveis:  
     Escaneie o QR Code exibido no terminal com o aplicativo **Expo Go**.  
   - Para emuladores:  
     Escolha a opção do emulador desejado na interface do Expo ou aperte a letra A.

5. **Depurar requisicoes API**  
   - Para ver as rotas que o aplicativo está chamando em termos de API, aperte J no terminal enquanto o projeto está rodando:  
--- 

Se precisar de ajuda, consulte a documentação oficial do [Expo](https://docs.expo.dev/) ou abra uma issue no repositório.
