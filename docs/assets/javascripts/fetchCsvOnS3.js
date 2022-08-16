function render_csv(selector, data) {
    table = document.createElement("table")
    thead = document.createElement("thead")
    tbody = document.createElement("tbody")
    table.appendChild(thead)
    table.appendChild(tbody)
    is_first = true
    data.forEach(elem => {
        if (elem[0] === '')
            return
        if (is_first) {
            tr = document.createElement("tr")
            elem.forEach(_ => {
                th = document.createElement("th")
                th.textContent = _.replaceAll('\"', '')
                tr.appendChild(th)
            })
            thead.appendChild(tr)
            is_first = false
        }
        else {
            tr = document.createElement("tr")
            elem.forEach(_ => {
                td = document.createElement("td")
                td.setAttribute("align", "left")
                if (_ === "\"-\"") { td.innerHTML = "-" }
                else if (_ === "\"\"" || _.lenght === 0) { td.innerHTML = " " }
                else if (_ === "\"---\"") { td.innerHTML = "---" }
                else {
                    res = marked.parse(_.replaceAll('\"', ''))
                        .replaceAll('<p>', '')
                        .replaceAll('</p>', '')
                    td.innerHTML = res
                }
                tr.appendChild(td)
            })
            tbody.appendChild(tr)
        }
    })

    selector.appendChild(table)
}

function parse_csv(text) {
    data = []
    const regex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g;
    text.split('\n').forEach(elem => {
        let row = []
        elem.match(regex).forEach(_ => {
            row.push(_.replace(",", "")) // replace only the first ","
        })
        data.push(row)
    })
    return data
}

async function fetch_url(url) {
    const response = await fetch(url, {
        method: 'GET',
    }).catch(err => console.log(err))
    const text = await response.text()
    return text
}

async function process_table() {
    const tables = document.querySelectorAll("#table-url")

    await Promise.all(Array.from(tables, item => item).map(async (_) => {
        const url = _.getAttribute('data-s3-table-url')
        await fetch_url(url).then(text => {
            data = parse_csv(text)
            render_csv(_, data)
        });
    }))
    add_copy_button();
    document.querySelectorAll(".dataTable > table").forEach(function (table) {
        table.setAttribute("class", "display compact nowrap")
        new DataTable(table, {
            scrollX: true,
            autoWidth: false,
            "order": [],
            fixedColumns:   {
                heightMatch: 'none'
            }
        });
    })
}

function find_next_table(item, id, data_attr) {
    let placeholder = item.nextElementSibling;
    let table
    while (placeholder) {
        if (placeholder.id === id && placeholder.attributes.hasOwnProperty(data_attr)) {
            table = placeholder;
            break;
        }
        placeholder = placeholder.nextElementSibling;
    }
    return table
}

async function fetch_date(url) {
    const response = await fetch(url, {
        method: 'GET',
    }).catch(err => console.log(err))
    return await response.json()
}

async function fetch_last_update_date() {
    const headers = document.getElementsByTagName('h2')
    const regex = /.*(objs3par(?:low|high)\d*.fr.world.socgen:\d*\/.*-acid-wiki-csv\/)(.*)/g;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    var formated_date

    await Promise.all(Array.from(headers, item => item).map(async (_) => {
        const _t = find_next_table(_, 'table-url', 'data-s3-table-url')
        if (_t) {
            const url = _t.getAttribute('data-s3-table-url').replace(regex, 'https://sgithub.fr.world.socgen/api/v3/repos/dds-itf-acid/acid-wiki_tables/commits?path=$2&page=1&per_page=1')
            formated_date = await fetch_date(url).then(json => {
                const date = new Date(json[0].commit.author.date)
                return 'Last update ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
            });
            find_exportable_tables(formated_date, find_next_table(_, 'exportable-table', 'data-export-name'));
        }
    }))
        
}

window.addEventListener("DOMContentLoaded", (event) => {
    process_table();
    fetch_last_update_date();
});
