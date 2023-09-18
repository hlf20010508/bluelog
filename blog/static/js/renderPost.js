let copy_icon_svg = `
<svg height="16" width="16" style="margin: 8px;">
    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
    <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
</svg>`

let copy_success_svg = `
<svg height="16" width="16" style="margin: 8px;">
    <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
</svg>`

$(() => {
    // 在服务器直接渲染会造成与预览时不一致的问题
    // 为保证与预览的渲染结果一致，直接在前端调用编辑器进行渲染
    let contentDiv = $("#markdown-content")
    let contentDivHidden = $("#raw-content-hidden")
    let rawContent = contentDivHidden.text()
    let htmlContent = easyMDE.markdown(rawContent)
    contentDiv.html(htmlContent)

    // 为代码段增加复制按钮
    let code_area = contentDiv.find("pre")
    code_area.wrap('<div class="code-div" style="position: relative"></div>')
    contentDiv = document.getElementById("markdown-content")
    let code_div = contentDiv.getElementsByClassName("code-div")
    for (let i = 0; i < code_div.length; i++) {
        let copy_icon = document.createElement("div")
        copy_icon.innerHTML = copy_icon_svg
        copy_icon.style.position = "absolute"
        copy_icon.style.right = "0"
        copy_icon.style.top = "0"
        copy_icon.style.border = "1px solid"
        copy_icon.style.borderRadius = "6px"
        copy_icon.style.fontSize = "14px"
        copy_icon.style.lineHeight = "20px"
        copy_icon.style.margin = "8px"
        copy_icon.style.width = "32px"
        copy_icon.style.height = "34px"
        copy_icon.style.borderColor = "rgba(31,35,40,0.15)"
        code_div[i].appendChild(copy_icon)
        copy_icon.addEventListener("mouseover", () => {
            copy_icon.style.cursor = "pointer"
        })
        copy_icon.addEventListener("click", () => {
            let code_text = code_area[i].textContent
            navigator.clipboard.writeText(code_text).then(() => {
                copy_icon.innerHTML = copy_success_svg
                setTimeout(() => {
                    copy_icon.innerHTML = copy_icon_svg
                }, 2000)
            })
        })
    }
})