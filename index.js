/**
 * @file mofron-comp-mfiltertab/index.js
 * @brief ok-cancel text component for mofron
 * @license MIT
 */
require("./filtertab.css");
const Text    = require('mofron-comp-text');
const Frame   = require('mofron-comp-frame');
const Tap     = require('mofron-event-tap');
const ConfArg = mofron.class.ConfArg;
const comutl  = mofron.util.common;

module.exports = class extends mofron.class.Component {
    /**
     * initialize component
     * 
     * @param (mixed) 
     *                key-value: component config
     * @short 
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname('mFilterTab');
            
	    /* init config */
            this.confmng().add('accentColor', { type:'color', init:[220,220,220] });
            this.confmng().add('baseColor', { type:'color', init:[255,255,255] });
            this.confmng().add('select', { type:'number' });
            
	    if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomConts () {
        try {
	    super.initDomConts();
            this.style({ display:'flex', width:window.innerWidth+'px', overflow:'scroll' });
	    this.styleDom().class('filtertab');
            
            /* init tab */
            this.text(
	        Text,
		{
		    size:'0.25rem',
		    style:{
		        'text-align':  'center',
			'white-space': 'nowrap',
			'padding':     '0.1rem'
                    },
		}
            );
	    this.frame(
                Frame,
                {
                    width:null, height:'0.35rem', radius:'0.17rem',
                    style: { 'align-items':'center', 'display':'flex', 'margin-left':'0.1rem' },
                }
            );

        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    beforeRender () {
        try {
            super.beforeRender();
            this.select(0);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    select (prm) {
        try {
            if (undefined === prm) {
                return this.confmng('select');;
            }
            /* setter */
            if ('number' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            let chd = this.child();
	    for (let idx in chd) {
                chd[idx].baseColor(this.baseColor());
	    }
            chd[prm].baseColor(this.accentColor());
            this.confmng('select', prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    tab (prm, cnf) {
        try {
            let frame = this.frame();
            let text  = this.text();
            
            let offset = 0;
	    if (-1 !== prm.indexOf('(')) {
                offset--;
	    }
	    if (-1 !== prm.indexOf(')')) {
                offset--;
	    }

            text.config({
	        text: prm,
		//style: { 'width': (0.25*(prm.length+offset))+'rem'  }
            });
	    text.style()
            
            let tap_evt = (t1,t2,t3) => {
                try {
		    let chd = t3.child();
		    for (let idx in chd) {
                        if (chd[idx].id() === t1.id()) {
                            t3.select(parseInt(idx));
			    break;
			}
		    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            };
	    frame.event(new Tap(new ConfArg(tap_evt,this)));
            frame.config(cnf);
            frame.child(text);
            
            this.child(frame);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    text (def, cnf) {
        try {
            if (undefined === def) {
                /* getter */
                let text_def = this.data('text-def');
                let ret      = new text_def(this.data('text-cnf'));
                return ret;
            }
            /* setter */
            if ('function' !== typeof def) {
                throw new Error('invalid parameter');
            }
            this.data('text-def', def); 
            if ('object' === typeof cnf) {
                this.data('text-cnf', cnf);
            }
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    frame (def, cnf) {
        try {
	    if (undefined === def) {
	        /* getter */
	        let frame_def = this.data('frame-def');
		let ret       = new frame_def(this.data('frame-cnf'));
		return ret;
	    }
	    /* setter */
            if ('function' !== typeof def) {
                throw new Error('invalid parameter');
	    }
	    this.data('frame-def', def);
	    if ('object' === typeof cnf) {
                this.data('frame-cnf', cnf);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    baseColor (prm) {
        try {
            return this.confmng('baseColor', prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    accentColor (prm) {
        try {
            return this.confmng('accentColor', prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    height (prm) {
        try {
            let frm_cnf = this.data('frame-cnf');
            if (undefined === prm) {
                return frm_cnf['height'];
            }
            frm_cnf['height'] = prm;
            this.data('frame-cnf', frm_cnf);
            
	    let chd = this.child();
            for (let cidx in chd) {
                if (true !== comutl.isinc(chd[cidx],'Frame')) {
                    continue;
		}
		chd[cidx].height(prm);
		chd[cidx].child()[0].size(comutl.sizediff(prm,"0.06rem"));
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
