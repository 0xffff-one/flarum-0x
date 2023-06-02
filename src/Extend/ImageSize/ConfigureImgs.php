<?php

namespace Flarum0x\Extend\ImageSize;

use s9e\TextFormatter\Configurator;

class ConfigureImgs {
    public function __invoke(Configurator $configurator)
    {
        foreach ($configurator->tags as $tagName => $tag)
        {
            if ($tagName === 'IMG') {
                $tag->setTemplate('<img src="{@src}" data-orig-src="{@origsrc}" title="{@title}" alt="{@alt}"><xsl:copy-of select="@height"/><xsl:copy-of select="@width"/></img>');
            } else if ($tagName === 'UPL-IMAGE-PREVIEW') {
                $tag->setTemplate('<img src="{@url}" data-orig-src={@origsrc} width="{@width}" height="{@height}" title="{@base_name}" alt="{@base_name}" />');
            }
        }
    }
}
