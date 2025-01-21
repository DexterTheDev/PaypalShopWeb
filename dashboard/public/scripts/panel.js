const deleteproduct = (id) => {
    $.ajax({
        type: "POST",
        url: `/products/delete/${id}`,
        success: (res) => {
            if (res.error) tata.error("Error", res.message)
            else {
                tata.success("Success", res.message)
                document.getElementById(id).remove()
            }
        }
    });
}

const preview = () => {
    tata.success("Preview", "This is just preview button for actual purchases go to products page")
}