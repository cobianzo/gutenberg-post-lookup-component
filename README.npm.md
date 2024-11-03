# Wordpress Gutenberg Post Lookup

`npm install @cobianzo/gutenberg-post-lookup-component`

in your `Edit.js` or `Edit.tsx` (or equivalent)

`import PostLookup from '@cobianzo/gutenberg-post-lookup-component';`

Assuming that you have a block with an attribute called `favPost` (type number)

## eg block.json : 
```
"attributes": {
    "favPost": {
      "type": "number",
      "default": 0,
    }
  },
```

## Entry javascript for your custom block (src/index.js):

```

import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { Panel, PanelBody } from "@wordpress/components";
import PostLookup from "@cobianzo/gutenberg-post-lookup-component";


registerBlockType("namespace/your-block", {

    // more properties here

    edit: (props) => {
        return (
        <div { ...useBlockProps() }>
            <InspectorControls>
            <Panel>
                <PanelBody>
                <PostLookup
                    selectedPostId={props.attributes.favPost}
                    onChange={(newPostId) =>
                    props.setAttributes({
                        favPost: newPostId || 0,
                    })
                    }
                />
                </PanelBody>
            </Panel>
            </InspectorControls>
            <p>The post ID is: {props.attributes.favPost || "No post selected"} </p>
        </div>
        );
    },
    save: () => null 
});

```


# Development

Repo for development: 

https://github.com/cobianzo/gutenberg-post-lookup-component/tree/main

There are several things in the TODO list. Feel free to collaborate with your PR.