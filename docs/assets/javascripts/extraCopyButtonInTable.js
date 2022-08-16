function find_copy_col_idx(row) {
    col_idx = -1;

    for (let i = 0; i < row.length; i++) {
        if (row[i].innerText == "Copy" | row[i].innerText == "") { col_idx = i }
    }
    return col_idx
}

function add_copy_button() {
    document.querySelectorAll("#exportable-table").forEach(elem => {
        if (elem.getAttribute('data-extra-copy-btn') == null) { return; }
        if (elem.getAttribute('data-export-name') == null) { return; }

        // Focus on first found table
        target_table = elem.nextElementSibling.getElementsByTagName("table")[0]
        if (target_table == undefined) { return; }

        // Get table name
        table_name = elem.getAttribute('data-export-name').replaceAll('-', '_');

        // Get Title row
        head = target_table.querySelector('thead').querySelectorAll('tr')
        copy_col_idx = find_copy_col_idx(head[0].children)
        if (copy_col_idx < 0) { return; }
        head[0].children[copy_col_idx].setAttribute("style", "min-width: fit-content;")

        // Make code snipter copyable
        rows = target_table.querySelector('tbody').querySelectorAll('tr')
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].hasChildNodes()) {
                // Get next item (docker pull command)
                if (rows[i].children[copy_col_idx].nextElementSibling) {
                    rows[i].children[copy_col_idx].nextElementSibling.setAttribute("id", `__code_${table_name}_${i}`)
                }
            }

            // Create copy buttons
            var button = document.createElement("button")
            button.setAttribute("class", "md-clipboard")
            button.setAttribute("style", "position: inherit; color: #36464e")
            button.setAttribute("data-clipboard-target", `#__code_${table_name}_${i} > code`)
            rows[i].children[copy_col_idx].appendChild(button)

        }
    });
}