import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Back Dev',
    img: require('@site/static/img/back.png').default,
    description: (
      <>
        指构建网站、应用程序或其他软件的背后部分，也称服务器端开发。涉及处理数据、逻辑和业务规则，并与前端用户界面进行通信。后端开发主要关注服务器端的功能和性能，以确保应用程序的顺利运行。
      </>
    ),
  },
  {
    title: 'Server',
    img: require('@site/static/img/server.png').default,
    description: (
      <>
        服务器是一种专门设计用于提供服务的计算机或计算机系统。它是一台高性能的硬件设备，具有更强大的处理能力、存储能力和网络连接能力，用于接收、处理和响应来自客户端的请求。
      </>
    ),
  },
  {
    title: 'SQL',
    img: require('@site/static/img/sql.png').default,
    description: (
      <>
        SQL（Structured Query Language）是一种声明性语言，用于执行各种数据库操作，如检索数据、插入、更新和删除数据、创建和修改数据库表以及定义数据间的关系等。
      </>
    ),
  },
];

function Feature({img, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} src={img}/>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
