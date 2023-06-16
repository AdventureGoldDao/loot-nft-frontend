import React from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";
// import tag from '../../assets/img/artist/flag.png'
import tag from '../../assets/img/artist/nftTag.svg'
import defaultHeader from '../../assets/img/default_header.png'
// import { ReactComponent as Tag } from "../../assets/img/artist/tag.svg";

const AvatarInner = ({ url, isOwnedNft, border = true, size = 50, tagSize = 30, bottomP = 0, leftP = 5, ...others }) => {
  return <div style={{ width: size, height: size }} className={`${styles.avatar_box} ${isOwnedNft ? styles.nftBorder : null}`} {...others}>
    {
      isOwnedNft ?
        <div style={{ width: size - 4, height: size - 4 }} className={`${styles.bg_white} ${isOwnedNft ? null : border ? styles.add_border : ''}`}>
          <img
            style={{ width: size - 4, height: size - 4 }}
            className={`${styles.avatar} `}
            src={url || defaultHeader}
          />
        </div> :

        <img
          style={{ width: size, height: size }}
          className={`${styles.avatar} ${isOwnedNft ? null : border ? styles.add_border : ''}`}
          src={url || defaultHeader}
        />
    }
    {isOwnedNft && <img width={tagSize} src={tag} className={styles.tag} style={{ bottom: bottomP + `px`, left: leftP + `px` }} ></img>}
    {/*isOwnedNft && <Tag width={tagSize} height={tagSize}  className={styles.tag}></Tag>*/}
  </div>
}
const Avatar = ({ twitter, address, ...others }) => {

  return (
    twitter ?
      <a href={`https://twitter.com/${twitter.creatorUniqueName}`} target="_blank">
        <AvatarInner {...others} />
      </a> :
      address ?
        <Link to={`/profile/${address}`}>
          <AvatarInner {...others} />
        </Link> : <AvatarInner {...others} />
  )
}

export default Avatar;


