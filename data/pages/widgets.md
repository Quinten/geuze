---
type: custom
layout: layout.njk
title: Widgets
metadescription: This is a page with examples of the different kind of widgets.
---
# Widgets

This is a page with examples of the different kind of widgets.

## Pancake

Nest wysiwyg editors in each other, to create responsive columns.

{% pancake %}{% slice %}<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac vulputate risus. Phasellus lacinia lectus dignissim, fermentum tortor in, hendrerit est. Nullam eget risus mi. Morbi sed velit ac sapien bibendum varius. Proin augue mauris, ullamcorper quis semper sit amet, tristique in nibh. Proin consequat enim quis diam venenatis, nec ultrices orci mattis. Nullam lorem enim, volutpat id felis nec, vehicula rutrum tellus.</p>{% endslice %}{% slice %}<p>Mauris quam lorem, laoreet at egestas sit amet, rutrum nec felis. Etiam aliquam nibh in mi facilisis vehicula. Nulla congue gravida turpis. In hac habitasse platea dictumst. Aliquam mauris lorem, suscipit quis commodo et, suscipit tincidunt sapien. Morbi imperdiet malesuada diam, a rhoncus mauris facilisis sit amet. Ut nec nisi ultricies, mollis arcu id, iaculis justo.</p>{% endslice %}{% endpancake %}

## Youtube

{% pancake %}{% slice %}<p>{% youtube "p6h-rYSVX90" %}</p>{% endslice %}{% slice %}<p>Adding a youtube video is really easy. Just supply the id of the video to the widget and the widget takes care of the rest. It is responsive and can be put into a pancake.</p>{% endslice %}{% endpancake %}

## Cards

{% pancake %}{% slice %}<p>{% card "/media/itch-thumb.png", "Lorem ipsum", "/", "Read more" %}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac vulputate risus.{% endcard %}</p>{% endslice %}{% slice %}<p>{% card "/media/itch-thumb.png", "Lorem ipsum", "/", "Read more" %}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac vulputate risus. Phasellus lacinia lectus dignissim, fermentum tortor in, hendrerit est.{% endcard %}</p>{% endslice %}{% slice %}<p>{% card "/media/itch-thumb.png", "Lorem ipsum", "/", "Read more" %}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac vulputate risus.{% endcard %}</p>{% endslice %}{% endpancake %}

{% pancake %}{% slice %}<p>{% card "/media/itch-thumb.png", "Lorem ipsum", "/", "Read more" %}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac vulputate risus.{% endcard %}</p>{% endslice %}{% slice %}<p>{% card "/media/itch-thumb.png", "Lorem ipsum", "/", "Read more" %}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac vulputate risus. Phasellus lacinia lectus dignissim, fermentum tortor in, hendrerit est.{% endcard %}</p>{% endslice %}{% slice %}<p>{% card "/media/itch-thumb.png", "Lorem ipsum", "/", "Read more" %}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac vulputate risus.{% endcard %}</p>{% endslice %}{% endpancake %}