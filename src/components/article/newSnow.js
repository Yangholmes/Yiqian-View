import Quill from 'quill';
import Delta from 'quill-delta';

// import './extends';

let Snow = Quill.import('themes/snow');

class NewSnow extends Snow{
    constructor(quill, options = {}) {
        super(quill, options);
    }

    // extendToolbar(toolbar) {
    //     super.extendToolbar(toolbar);
    //     let table = toolbar.container.querySelectorAll('.ql-table')[0];
    //     table && (table.innerHTML = `<span class="fa fa-table"></span>`);
    // }
}

NewSnow.DEFAULTS = Object.assign({}, Snow.DEFAULTS, {
    modules: {
        toolbar: {
            handlers: {
                image() {
                    let fileInput = this.container.querySelector('input.ql-image[type=file]');
                    if (fileInput == null) {
                        fileInput = document.createElement('input');
                        fileInput.setAttribute('type', 'file');
                        fileInput.setAttribute('accept', 'image/*');
                        fileInput.classList.add('ql-image');
                        fileInput.addEventListener('change', () => {
                            if (fileInput.files != null && fileInput.files[0] != null) {
                                let reader = new FileReader();
                                reader.onload = e => {
                                    let range = this.quill.getSelection(true);
                                    this.quill.updateContents(new Delta()
                                        .retain(range.index)
                                        .delete(range.length)
                                        .insert({image: e.target.result}), 'user');
                                    this.quill.setSelection(range.index + 1, 'silent');
                                    fileInput.value = "";
                                };
                                reader.readAsDataURL(fileInput.files[0]);
                            }
                        });
                        this.container.appendChild(fileInput);
                    }
                    fileInput.click();
                }
                // table() {
                //     let index = this.quill.getSelection().index || 0;
                //     this.quill.insertEmbed(index, 'table', '', 'user');
                // }
                // checkbox() {
                //     let index = this.quill.getSelection().index || 0;
                //     this.quill.insertEmbed(index, 'checkboxGroup', '', 'user');
                // }
            }
        }
    }
});

Quill.register('themes/newSnow', NewSnow);
