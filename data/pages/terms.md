---
type: custom
layout: layout.njk
title: Terms and Conditions
metadescription: Terms and conditions.
---
# Terms and Conditions

This is the page for terms and conditions.

<div wrap="cards">{% for post in collections.post reversed limit:3 %}{% card undefined, post.data.title, post.url, undefined %}<strong>{{ post.data.date | blogdateformat }}</strong></p><p>{{ post.data.metadescription }}{% endcard %}{% endfor %}</div>
