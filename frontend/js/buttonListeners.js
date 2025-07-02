export function setupToolButtons(onToolSelected) {
    const buttons = document.querySelectorAll('.btn-drawing-tools');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const tool = button.getAttribute('data-tool');
            onToolSelected(tool);
        });
    });
}