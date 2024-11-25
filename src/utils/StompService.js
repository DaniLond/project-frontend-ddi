const getWebSocketUrl = () => {
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const hostname = window.location.hostname;
  const port = window.location.port ? `:${window.location.port}` : "";
  return `${protocol}//${hostname}${port}/PROJECT-FRONTEND-DDI/ws-connect`;
};
