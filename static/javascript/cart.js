const deleteCartItem = async (cart_item_id) => {
  await fetch(`/cart_item/${cart_item_id}`, {
    method: "DELETE",
    redirect: "follow",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.redirected) {
      window.location.href = response.url;
    }
  });
};

const updateCartItem = async (cart_item_id, quantity) => {
  await fetch(`/cart_item/${cart_item_id}`, {
    method: "PUT",
    redirect: "follow",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity }),
  }).then((response) => {
    if (response.redirected) {
      window.location.href = response.url;
    }
  });
};

const getTotalAmount = async () => {
  await fetch(`/cart_item/total`, {
    method: "GET",
    redirect: "follow",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    const dollar = (await response.json()).total;
    div = document.getElementById("total");
    const rial = await convertCurrency(dollar, "IRR");
    div.innerHTML = "Total Amount: " + dollar + "$/ " + rial + " RIAL";
  });
};

const convertCurrency = async (amount, toCurrency) => {
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/61a4767caee2d928e2638394/latest/USD`
  );
  const data = await response.json();
  const exchangeRate = data.conversion_rates[toCurrency];
  return amount * exchangeRate;
};
