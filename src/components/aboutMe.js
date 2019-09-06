import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Grid from "@material-ui/core/Grid"
import { flexbox } from "@material-ui/system";

import "./layout.css";

const style = ({
    authorName: {
        color: '#666565',
    },
    excerptText: {
        paddingRight: '15px',
        paddingLeft: '15px',
    }
  })

export default () => {
    const data = useStaticQuery(graphql`
        query {
            contentfulBlogPost {
                author {
                  authorName
                  childContentfulAuthorDescriptionRichTextNode {
                    childContentfulRichText {
                      html
                    }
                  }
                  authorPhoto {
                    fixed(width: 300, height: 300, resizingBehavior: CROP) {
                        ...GatsbyContentfulFixed_tracedSVG
                      }
                  }
                }
              }
        }
    `)

    const { authorName, authorPhoto, childContentfulAuthorDescriptionRichTextNode } = data.contentfulBlogPost.author
    return (
        <div className="aboutContainer">
            <Img className="authorPhoto" alt={authorName} fixed={authorPhoto.fixed} />
            <div className="aboutText" style={style.excerptText}>
                <div className="name">
                    <h2 style={style.authorName}>{authorName}</h2>
                </div>
                <div className="excerpt">
                    <div dangerouslySetInnerHTML={{__html: childContentfulAuthorDescriptionRichTextNode.childContentfulRichText.html}} />
                </div>
            </div>
        </div>
    )
}