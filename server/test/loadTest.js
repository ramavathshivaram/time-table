import autocannon from "autocannon";

const init = () => {
  const instance = autocannon({
    url: "http://localhost:8080",
    connections: 1000,
    duration: "10s",
  });

  autocannon.track(instance);
};

init();