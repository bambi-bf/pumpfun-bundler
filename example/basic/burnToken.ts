const requestBody = {
    mint: 'FP5SwaQvsJRMEqAjYbwMqhGwRDKE6RznXaSjwPof61k3',
    priorityFee: 0.001,
    userPrivateKey: '3qesJ12P92MTNfY3C4Sa8BKWEwRexASEx1RtNnaSZsQaUksVUuiHhvhsBx87SzJpxz3rs3ogu4ytsjSgNLKM7HiU'
};

fetch('https://pumpapi.fun/api/burn_tokens', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));