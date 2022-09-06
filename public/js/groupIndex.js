const exampleModal = document.getElementById("myModal");
exampleModal.addEventListener("show.bs.modal", function(event) {

  const button = event.relatedTarget;

  // Extract info from data-bs-* attributes
  const groupId = button.getAttribute("data-bs-id");
  const groupName = button.getAttribute("data-bs-groupName");


  const modalTitle = exampleModal.querySelector(".modal-title");
  const confirmDelete = exampleModal.querySelector(".btn-danger");
  modalTitle.textContent = "Delete " + groupName + "?";

  // delete a group after confirmation
  confirmDelete.addEventListener("click", async function(el) {
    try {
      const response = await fetch("groups/deleteGroup", {
        method: "delete",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          "groupIdFromJSFile": groupId,
        }),
      });
      await response.json();
      location.reload();
    } catch (err) {
      console.log(err);
    }
  });
//  modalBodyInput.value = recipient
});

