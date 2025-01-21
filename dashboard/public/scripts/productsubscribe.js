const buy = (id) => {
    $.ajax({
        type: "POST",
        url: `/subscribe/${id}`,
        data: JSON.stringify({ email: document.getElementById("email").value
        }),
        dataType: "json",
        contentType: 'application/json',
        success: async (res) => {
            if (res.error) tata.error("Error", res.message)
            else location.href=res.paypal
        }
    });
}