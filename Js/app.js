const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

const saveNotes = () => {
    const notres = document.querySelectorAll(".notes textarea");
    const data = [];
    notres.forEach((note) => {
        data.push(note.value);
    });

    if (data.length === 0) {
        localStorage.removeItem("notes");
    }
    else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
};

addBtn.addEventListener("click", function () {
    addNote();
});

const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("notes");
    note.innerHTML = `
    <div class="tool">
        <i class="save fa-solid fa-floppy-disk"></i>
        <i class="trash fa-solid fa-trash"></i>
    </div>
    <textarea>${text}</textarea>
    `;

    note.querySelector(".trash").addEventListener("click", function () {
        note.remove();
        saveNotes();
    });

    note.querySelector(".save").addEventListener("click", function () {
        saveNotes();
    });

    note.querySelector("textarea").addEventListener("focusout", function () {
        saveNotes();
    });
    main.appendChild(note);
    saveNotes();
};

(function () {
    const lsNotes = JSON.parse(localStorage.getItem("notes"));
    if (lsNotes === null) {
        addNote()
    } else {
        lsNotes.forEach(
            (lsNotes) =>{
                addNote(lsNotes)
            }
        )
    }
})();