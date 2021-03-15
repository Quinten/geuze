---
type: custom
layout: layout.njk
title: Terms and Conditions
metadescription: Terms and conditions.
---
# Terms and Conditions

This is the page for terms and conditions.

<div wrap="code">{% for post in collections.post | reverse %}{% if loop.index0 < 3 %}{% card undefined, post.data.title, post.url, undefined %}<strong>{{ post.data.date.toLocaleDateString('en', {year: 'numeric', month: 'long', day: 'numeric'}) }}</strong></p><p>{{ post.data.metadescription }}{% endcard %}{% endif %}{% endfor %}</div>