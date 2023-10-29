import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Back Dev',
    img: require('@site/static/img/back.png').default,
    description: (
      <>
        Back Dev.
      </>
    ),
  },
  {
    title: 'Server',
    img: require('@site/static/img/server.png').default,
    description: (
      <>
        Server.
      </>
    ),
  },
  {
    title: 'SQL',
    img: require('@site/static/img/sql.png').default,
    description: (
      <>
        SQL.
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
