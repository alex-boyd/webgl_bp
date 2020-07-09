/*

webgl boilerplate 

some working(?) texture code

function initTextures(textures)
{
    for(var i = 0; i < textures.length; i++)
    {
        // create texture object
        var tex = gl.createTexture();
        if(!tex){console.log("failed to create texture object"); return false;}

        // get pointer to sampler
        //var smp = this.gl.getUniformLocation(this.gl.program, "u_Sampler"+i);
        //if(!smp){console.log("failed to create sampler object"); return false;}

        // create image object
        var img = new Image();
        if(!img){console.log("failed to create image object"); return false;}

        img.onload = function()
        {
            // flip y axis because you have to
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);


            // set active texture
            if(i==0){gl.activeTexture(gl.TEXTURE0);}
            //if(i==1){gl.activeTexture(gl.TEXTURE1);}
            //if(i==2){gl.activeTexture(gl.TEXTURE2);}
            //if(i==3){gl.activeTexture(gl.TEXTURE3);}
            //if(i==4){gl.activeTexture(gl.TEXTURE4);}
            //if(i==5){gl.activeTexture(gl.TEXTURE5);}
            //if(i==6){gl.activeTexture(gl.TEXTURE6);}
            //if(i==7){gl.activeTexture(gl.TEXTURE7);}

            // bind texture to target
            gl.bindTexture(gl.TEXTURE_2D, tex);

            // set texture parameters            
            gl.texParameteri
            (
                gl.TEXTURE_2D,
                gl.TEXTURE_MIN_FILTER,
                gl.LINEAR
            );

            // load image into gl texture
            gl.texImage2D
            (
                gl.TEXTURE_2D,
                0,
                gl.RGBA,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                img
            );

            gl.generateMipmap(gl.TEXTURE_2D);

            // pass gl texture unit to the sampler
           // gl.uniform1i(smp, i);
        };

        console.log(textures[i].path);
        img.src = textures[i].path;
    }
}

*/
