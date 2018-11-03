/**
 * 表格扩展
 * 2018-10-29 未完成，必须对所有表格组件进行声明和注册方可使用，内容太多，不想做了。。。
 * 2018-10-31 完成新增表格，表格新增之后，必须对<table>标签进行注册，在`core/clipboard`中注册，才能被`clipboard.convert()`方法顺利初始化，没有发现注册的接口，有点难搞，不想做了。。。
 * @file
 * @author Yangholmes 2018-10-29
 */
import Quill from 'quill';
let Parchment = Quill.import('parchment');
let Container = Quill.import('blots/container');
let Inline = Quill.import('blots/inline');
let Block = Quill.import('blots/block');

/**
 * [MkTd description]
 */
class MkTd extends Block {
    static create(value) {
        let node = super.create('td');
        node.setAttribute('contentEditable', true);
        return node;
    }

    constructor(domNode) {
        super(domNode);
        domNode.addEventListener('keydown', e => {
            console.log(e);
            switch (e.keyCode) {
                case 13:
                    e.preventDefault();
                    let newTr = Parchment.create('tr');
                    this.parent.parent.appendChild(newTr);
                    window.setTimeout(() => newTr.children.head.domNode.focus(), 0);
                    break;
                case 9:
                    e.preventDefault();
                    let newTd = Parchment.create('td');
                    this.parent.appendChild(newTd);
                    window.setTimeout(() => newTd.domNode.focus(), 0);
                    break;
                case 8:
                    break;
                default:
                    break;
            }
        });
    }
}

MkTd.blotName = 'td';
MkTd.tagName = 'td';

/**
 * [MkTr description]
 */
class MkTr extends Container {
    static create(value) {
        let node = super.create('tr');
        return node;
    }
}

MkTr.scope = Parchment.Scope.BLOCK_BLOT;
MkTr.blotName = 'tr';
MkTr.tagName = ['tr'];
MkTr.defaultChild = 'td';
MkTr.allowedChildren = [MkTd];

/**
 * [MkTable description]
 */
class MkTable extends Container {
    static create(value) {
        let node = super.create('table');
        node.setAttribute('contentEditable', false);
        return node;
    }
};

MkTable.scope = Parchment.Scope.BLOCK_BLOT;
MkTable.blotName = 'table';
MkTable.tagName = ['table'];
MkTable.defaultChild = 'tr';
MkTable.allowedChildren = [MkTr];

let Module = Quill.import('core/module');

class Table extends Module {
    constructor(quill, options) {
        super(quill, options);
    }
}


Quill.register({
    'formats/table/tr/td': MkTd,
    'formats/table/tr': MkTr,
    'formats/table': MkTable,

    'modules/table': Table
}, true);
