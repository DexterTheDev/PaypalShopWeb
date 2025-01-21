const submitproduct = (product, edit) => {
    $.ajax({
        type: "POST",
        data: JSON.stringify({
            name: document.getElementById("name").value,
            price: document.getElementById("price").value,
            description: document.getElementById("description").value,
            url: document.getElementById("url").value,
            role: document.getElementById("role").value,
            image: document.getElementById("image").value
        }),
        url: `/products${edit?edit:""}/${product}`,
        dataType: "json",
        contentType: 'application/json',
        success: (res) => {
            if (res.error) tata.error("Error", res.message)
            else {
                tata.success("Success", res.message)
                setTimeout(() => {
                    location.href = "/panel"
                }, 3000)
            }
        }
    });
}