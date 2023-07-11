import IcWebSocket from "./icWebsocket";
import addNotification from "./utils/addNotification";
import { ic_websocket_backend } from "../../declarations/ic_websocket_backend";

const backendCanisterId = process.env.CANISTER_ID_IC_WEBSOCKET_BACKEND || "";
const gatewayAddress = "ws://127.0.0.1:8080";
const url = "http://127.0.0.1:4943";
const localTest = true;
const persistKey = false;
// const url = "https://ic0.app";
// const localTest = false;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>IC WebSocket</h1>
    <div class="notifications-outer">
      <div id="notifications" class="notifications"></div>
    </div>
  </div>
`

const ws = new IcWebSocket(gatewayAddress, undefined, {
  canisterId: backendCanisterId,
  canisterActor: ic_websocket_backend,
  networkUrl: url,
  localTest,
  persistKey,
});

ws.onopen = () => {
  console.log("IcWebSocket opened");
};

ws.onmessage = (event) => {
  addNotification(event.data);

  ws.send({
    text: event.data + " -pong",
  });
};

ws.onclose = () => {
  console.log("IcWebSocket closed");
};

ws.onerror = (event) => {
  console.log("IcWebSocket error", event);
};

console.log(ws);
