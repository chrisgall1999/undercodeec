import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'gatsby';
import plans from 'data/Saas/plans.json';
import plansRTL from 'data/Saas/plans-rtl.json';

const Pricing = ({ rtl }) => {
  const data = useMemo(() => rtl ? plansRTL : plans, [rtl]);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    let formattedFeatures = [];

    data[0].features.forEach(feature => formattedFeatures.push({ title: feature.title, data: [] })) ;

    data.forEach((plan, i) => {
      plan.features.forEach((feature, x) => {
        formattedFeatures[x].data[i] = feature.checked !== undefined ? feature.checked : feature.content;
      })
    });

    setFeatures(formattedFeatures);
  }, [data]);

  const togglePlanDuration = (duration) => {
    let monthly = document.querySelectorAll('.monthly_price');
    let yearly = document.querySelectorAll('.yearly_price');

    if (duration === 'monthly') {
      monthly.forEach(price => price.classList.add('d-block'));
      monthly.forEach(price => price.classList.remove('d-none'));
      yearly.forEach(price => price.classList.add('d-none'));
      yearly.forEach(price => price.classList.remove('d-block'));
    } else {
      monthly.forEach(price => price.classList.add('d-none'));
      monthly.forEach(price => price.classList.remove('d-block'));
      yearly.forEach(price => price.classList.add('d-block'))
      yearly.forEach(price => price.classList.remove('d-none'));
    }
  }

  return (
    <section className="pricing section-padding style-5" data-scroll-index="4">
      
    </section>
  )
}

export default Pricing