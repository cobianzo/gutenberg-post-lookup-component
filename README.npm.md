# Wordpress Gutenberg Post Lookup

`npm install @cobianzo/gutenberg-post-lookup-component`

in your `Edit.jsx` or `Edit.tsx` (or equivalent)

`import PostLookup from '@cobianzo/gutenberg-post-lookup-component';`

Assuming that you have a block with an attribute called `favPost` (type number)

```
# Edit.js

import { InspectorControls } from "@wordpress/block-editor";
import { Panel, PanelBody } from "@wordpress/components";
import PostLookup from "@cobianzo/gutenberg-post-lookup-component";


<InspectorControls>
    <Panel>
        <PanelBody>
            <PostLookup
                selectedPostId={ props.attributes.favPost }
                onChange={ ( newPostId ) =>
                    props.setAttributes( {
                        favPost: newPostId || 0,
                    } )
                }
            />
        </PanelBody>
    </Panel>
</InspectorControls>
```


There are several things in the TODO list. Here the original github repo:

https://github.com/cobianzo/gutenberg-post-lookup-component/


