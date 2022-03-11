package com.hbl.kms.config;

import lombok.RequiredArgsConstructor;
import org.apache.tiles.AttributeContext;
import org.apache.tiles.preparer.PreparerException;
import org.apache.tiles.preparer.ViewPreparer;
import org.apache.tiles.request.Request;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
public class MenuPreparer implements ViewPreparer {

    // private final MenuService menuService;

    @Override
    public void execute(Request tilesContext, AttributeContext attributeContext) {
        try {
            Map<String, Object> model;

            if(tilesContext != null) model = tilesContext.getContext("request");
            else model = new HashMap<>();
            //model.put("menuList", menuService.getMenuList());
        } catch (IllegalArgumentException ie) {

        } catch (PreparerException pe) {

        } catch (Exception  e) {

        }
    }
}
